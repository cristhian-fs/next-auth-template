"use client"

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import {BarLoader} from "react-spinners"
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";

const VerificationForm = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(() => {
    console.log(token)
    if(!token) {
      setError("Missing token!")
      return
    };

    newVerification(token).then(data =>{ 
      setSuccess(data.success);
      setError(data.error);
    })
    .catch(() => {
      setError("Something went wrong!")
    });
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return ( 
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && (
          <BarLoader color="#fff"/>
        )}
        <FormSucess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
   );
}
 
export default VerificationForm;