import CommonHeader from "@/src/components/header/commonHeader";
import MainLayout from "@/src/components/MainLayout";
import ViewAttendanceRequest from "@/src/components/time attendance/ViewAttendanceRequest";
import SearchButtonWBar from "@/src/elements/searchButtonWBar";
import SoraAddButton from "@/src/elements/soraAddButton";
import { attendanceRequestData } from "@/src/helpers/dummyDatas/attendanceRequestData";
import { RelativePathString } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

type Props = {};

const TimeAttendance = (props: Props) => {
  return (
    <MainLayout
      topSection={
        <CommonHeader
          item={{
            link: "/employeeManagement" as RelativePathString,
            title: "Time Attendance",
          }}
          element={<SearchButtonWBar />}
        />
      }
      bottomSection={
        <View>
          <FlatList
            data={attendanceRequestData}
            keyExtractor={(leave) => leave.id.toString()}
            // if it your render element does not expect {item} as a props, you need to pass it like so, else you could just get away with refering the componente and not calling it specifically like this
            renderItem={({ item }) => (
              <ViewAttendanceRequest attendanceItem={item} />
            )}
            contentContainerStyle={{ gap: 12 }}
          />

          <SoraAddButton
            navigateTo={"/addAttendanceRequest" as RelativePathString}
          />
        </View>
      }
    />
  );
};

export default TimeAttendance;
