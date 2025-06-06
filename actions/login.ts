"use server";

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { 
  generateVerificationToken, 
  generateTwoFactorToken 
} from '@/lib/tokens';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail
} from '@/lib/mail';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import bcrypt from 'bcryptjs';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email,password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email);

  if(!existingUser || !existingUser.email || !existingUser.password){
    return { error: "Email does not exist!"}
  }

  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!"}
  }

  // ⚠️ Verificar a senha ANTES de qualquer 2FA
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    return { error: "Invalid credentials!" };
  }

  if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){

      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      if(!twoFactorToken) return { error: "Invalid code!" }

      if(twoFactorToken.token !== code){
        return { error: "Invalid code!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if(hasExpired) return { error: "Expired code!"}

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if(existingConfirmation){
        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      });
      
    } else{
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )
  
      return { twoFactor: true }
    } 
  }

  try{
    await signIn("credentials",{
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch(error){
    if(error instanceof AuthError){
      switch(error.type){
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" }
        default: 
          return { error: "Something went wrong!"}
      }
    }
    throw error
  }
}