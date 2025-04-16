"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existing = await getVerificationTokenByToken(token);

  if(!existing) return { error: "Invalid token!" }

  const hasExpired = new Date(existing.expires) < new Date();

  if(hasExpired) return { error: "Expired token!"}

  const existingUser = await getUserByEmail(existing.email);

  if(!existingUser) return { error: "Email does not exist!"}

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingUser.email
    }
  })

  await db.verificationToken.delete({
    where: { id: existing.id },
  })

  return { success: "Email verified!" }
}