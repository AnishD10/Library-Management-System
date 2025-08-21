import CommonHeader from "@/src/components/header/commonHeader";
import AddLeaveRequestForm from "@/src/components/leave management/AddLeaveRequestForm";
import MainLayout from "@/src/components/MainLayout";
import { RelativePathString } from "expo-router";
import React from "react";

const AddLeaveRequest = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/leaveManagement" as RelativePathString,
            title: "Add Leave Request",
          }}
        />
      }
      bottomSection={<AddLeaveRequestForm />}
    />
  );
};

export default AddLeaveRequest;
