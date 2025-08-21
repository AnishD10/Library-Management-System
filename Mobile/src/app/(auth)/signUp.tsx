import SignUpForm from "@/src/components/auth/signupForm";
import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import React from "react";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/mainAuth",
            title: "Sign Up",
            desc: "Sign up to begin an amazing journey!",
          }}
        />
      }
      bottomSection={
        // <KeyboardAvoidingView
        //   behavior={Platform.OS === "ios" ? "padding" : "height"}
        //   className="h-full w-full pt-2 gap-4"
        // >
        <SignUpForm />
        // </KeyboardAvoidingView>
      }
    />
  );
};

export default SignUp;
