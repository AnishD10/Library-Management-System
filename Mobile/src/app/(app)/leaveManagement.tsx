import CommonHeader from "@/src/components/header/commonHeader";
import ViewLeaveRequest from "@/src/components/leave management/ViewLeaveRequest";
import MainLayout from "@/src/components/MainLayout";
import SoraAddButton from "@/src/elements/soraAddButton";
import { leaveRequestData } from "@/src/helpers/dummyDatas/leaveRequestData";
import { RelativePathString } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

type Props = {};

const LeaveManagement = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/employeeManagement" as RelativePathString,
            title: "Leave Management",
          }}
        />
      }
      bottomSection={
        <View>
          <FlatList
            data={leaveRequestData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ViewLeaveRequest leaveRequestItem={item} />
            )}
          />

          <SoraAddButton
            navigateTo={"/addLeaveRequest" as RelativePathString}
          />
        </View>
      }
    />
  );
};

export default LeaveManagement;
