import AddEmployeeForm from "@/src/components/employee management/addEmployeeForm";
import CommonHeader from "@/src/components/header/commonHeader";
import { RelativePathString } from "expo-router";
import React from "react";
// import { KeyboardAvoidingView, Platform } from "react-native";
import MainLayout from "../../components/MainLayout";

const AddEmployee = () => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/viewEmployee" as RelativePathString,
            title: "Add Employee",
          }}
        />
      }
      bottomSection={
        // <KeyboardAvoidingView
        //   behavior={Platform.OS === "ios" ? "padding" : "height"}
        //   className="flex-1"
        // >
        <AddEmployeeForm />
        // </KeyboardAvoidingView>
      }
    />
  );
};

export default AddEmployee;
