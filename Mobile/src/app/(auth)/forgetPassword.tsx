import ForgotPasswordForm from "@/src/components/auth/forgotPasswordForm";
import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import { deleteUserTokenxWelcomeSeen } from "@/src/helpers/storage";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {};

const ForgetPassword = (props: Props) => {


  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/signIn",
            title: "Forgot Password",
            desc: "Reset your password with ease!",
          }}
        />
      }
      bottomSection={
        <ForgotPasswordForm />
      }
    />
  );
};

export default ForgetPassword;
