import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import AddAttendanceRequestForm from "@/src/components/time attendance/AddAttendanceRequestForm";
import React from "react";

type Props = {};

const AddAttendanceRequest = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{ link: "timeAttendance", title: "Add Attendance Request" }}
        />
      }
      bottomSection={<AddAttendanceRequestForm />}
    />
  );
};

export default AddAttendanceRequest;
