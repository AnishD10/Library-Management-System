import ListView from "@/src/components/dashboard/ListView";
import CommonHeader from "@/src/components/header/commonHeader";
import { employeeManagementItems } from "@/src/helpers/dummyDatas/ListViewData";
import React from "react";
import { FlatList } from "react-native";
import MainLayout from "../../components/MainLayout";

const item = { title: "Employee Management", link: "/userDashboard" };

const EmployeeManagement = (props: Props) => {
  return (
    <MainLayout
      topSection={<CommonHeader item={item} />}
      bottomSection={
        <FlatList
          data={employeeManagementItems}
          keyExtractor={(employeeManagementItems) =>
            employeeManagementItems.id.toString()
          }
          renderItem={ListView}
          contentContainerStyle={{
            gap: 12,
          }}
        />
      }
    />
  );
};

export default EmployeeManagement;
