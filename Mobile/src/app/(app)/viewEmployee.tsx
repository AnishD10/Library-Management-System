import ViewEmployeeComponent from "@/src/components/employee management/viewEmployeeComponent";
import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import SearchButtonWBar from "@/src/elements/searchButtonWBar";
import { tempEmployeeListData } from "@/src/helpers/dummyDatas/tempEmployeeListData";
import { RelativePathString } from "expo-router";
import React from "react";

type Props = {};

const viewEmployee = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/employeeManagement" as RelativePathString,
            title: "View Employees",
          }}
          element={<SearchButtonWBar />}
        />
      }
      //later replace "null"/dummy data with data fetched through the backend... hmm.....
      bottomSection={<ViewEmployeeComponent item={tempEmployeeListData} />}
    />
  );
};

export default viewEmployee;
