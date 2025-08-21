import SignInForm from "@/src/components/auth/signinForm";
import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import React from "react";

type Props = {};

const signIn = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            title: "Sign In",
            link: "/mainAuth",
            desc: "Sign in now to begin an amazing journey!",
          }}
        />
      }
      bottomSection={<SignInForm />}
    />
  );
};

export default signIn;
