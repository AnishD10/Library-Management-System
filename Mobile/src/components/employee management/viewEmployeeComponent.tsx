import NoEmployee from "@/assets/svgs/undraw_nodata.svg";
import EmployeeList from "@/src/elements/employeeList";
import SoraAddButton from "@/src/elements/soraAddButton";
import { RelativePathString } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

type Props = {};

const ViewEmployeeComponent = ({ item }: { item: any }) => {
  // console.log(item);

  return (
    <View className="h-full w-full">
      {item ? (
        <View>
          <FlatList
            data={item}
            keyExtractor={(employees) => employees.employeeId}
            renderItem={EmployeeList}
            contentContainerClassName=""
          />

          <SoraAddButton navigateTo={"/addEmployee" as RelativePathString} />
        </View>
      ) : (
        // for test only, need to replace this with FlatList
        // item.map((item) => (

        // ))
        <View className="h-full w-full items-center justify-center relative">
          <NoEmployee height="250px" width="250px" />
          <Text className="text-3xl text-textPrimary font-semibold">
            No Data
          </Text>
          <Text className="text-textSecondary">Add Your Employee</Text>

          <SoraAddButton navigateTo={"/addEmployee" as RelativePathString} />
        </View>
      )}
    </View>
  );
};

export default ViewEmployeeComponent;
