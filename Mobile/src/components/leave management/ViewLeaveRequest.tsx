import { ILeaveRequest } from "@/src/interfaces";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ViewLeaveRequest = ({
  leaveRequestItem,
}: {
  leaveRequestItem: ILeaveRequest;
}) => {
  return (
    <View className="w-full justify-start bg-white rounded-lg mt-4 p-4 gap-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2">
          <Image
            className="h-12 w-12 rounded-full border border-secondary"
            source={{ uri: leaveRequestItem.image }}
          />
          <View>
            <Text className="font-semibold text-lg text-textPrimary">
              {leaveRequestItem.employeeName}
            </Text>
            <Text className="text-textSecondary">
              {leaveRequestItem.designation}
            </Text>
          </View>
        </View>
        <Text
          className="px-6 py-2 rounded-lg font-bold text-primary text-xl"
          style={{
            backgroundColor: "rgba(145, 203, 255, 0.3)",
            // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          P
        </Text>
      </View>

      <View className="py-4 gap-6">
        <View className="w-full gap-2">
          <View className="flex-row w-full">
            <Text className="flex-1 text-lg text-textPrimary">Leave From</Text>
            <Text className="flex-1 text-lg text-textPrimary">Leave Till</Text>
            {/* <Text className="flex-1 text-lg text-textPrimary">Out Time</Text> */}
          </View>

          <View className="border-b border-gray-200"></View>

          <View className="flex-row w-full">
            <Text className="flex-1 text-lg text-textSecondary">
              {leaveRequestItem.dateFrom}
            </Text>
            <Text className="flex-1 text-lg text-textSecondary">
              {leaveRequestItem.dateTo}
            </Text>
            {/* <Text className="flex-1 text-lg text-textSecondary">
              {leaveRequestItem.outTime}
            </Text> */}
          </View>

          <View>
            <Text className="text-lg text-textPrimary">Reason</Text>
            <Text className="flex-1 text-lg text-textSecondary">
              {leaveRequestItem.reason}
            </Text>
          </View>
        </View>

        <View className="flex-row w-full gap-4">
          <TouchableOpacity
            className="flex-1 py-4 rounded-lg"
            style={{
              backgroundColor: "rgba(145, 203, 255, 0.3)",
              // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <Text className="text-center text-textPrimary font-semibold text-2xl">
              Reject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 py-4 rounded-lg bg-primary">
            <Text className="text-center text-surface font-semibold text-2xl">
              Approve
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewLeaveRequest;
