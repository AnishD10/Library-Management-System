import Avatar from "@/assets/svgs/undraw_avatar.svg";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RelativePathString, router } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { workingNoToDays } from "../helpers/workingNoToDays";
import { IEmployeeForm } from "../interfaces";

type Props = {};

const EmployeeList = ({ item }: { item: IEmployeeForm }) => {
  const {
    joiningDate,
    basicPay,
    profilePhoto,
    fullName,
    workingDays,
    designation,
    department,
    perDay,
  } = item;

  const handleDeleteAlert = () => {
    // <View>

    // {
    Alert.alert(
      "Delete Employee",
      "Are you sure you want to delete it?",
      [
        {
          text: "Delete",
          onPress: () => {},
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
    // }
    //     </View>
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/(app)/userProfile/${item.employeeId}` as RelativePathString
        )
      }
      key={item.employeeId}
      className="mb-4 bg-white p-4 rounded-xl flex-row justify-between"
      style={
        Platform.OS === "ios"
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              //   borderColor: item.color,
            }
          : {
              elevation: 2,
              //   borderColor: item.color,
            }
      }
    >
      <View className="gap-2">
        <View className="h-12 w-12 rounded-full border border-textSecondary ">
          {item.profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <Avatar height="40px" width="40px" />
          )}
        </View>

        <View className="flex-row items-baseline gap-2">
          <Text className="font-bold text-textPrimary text-2xl">
            {fullName}
          </Text>
          <Text className="text-sm text-textSecondary">
            {new Date(joiningDate).toLocaleDateString()}
          </Text>
        </View>

        <View className="flex-row items-end gap-2">
          <Text className="text-xl font-semibold">{designation}</Text>
          <Text className="p-1 bg-secondary rounded-lg text-white">
            {department}
          </Text>
        </View>
        {/* <Text>{workingNoToDays(workingDays)}</Text> */}
        <View className="flex-row gap-1">
          {workingNoToDays(workingDays).map((day, index) => (
            <Text
              className="rounded-lg bg-secondary p-1 text-white"
              key={index}
            >
              {day}
            </Text>
          ))}
        </View>

        <View className="flex-row items-end gap-2">
          <Text className="text-xl font-semibold">Rs. {basicPay}</Text>
          <Text className="p-1 bg-secondary rounded-lg text-white">
            {perDay ? "Per Day" : "Per Month"}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => navigate("/addEmployee")}>
          <FontAwesomeIcon icon={faEdit} size={20} color="#81C784" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAlert}>
          <FontAwesomeIcon icon={faTrash} size={20} color="#E57373" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default EmployeeList;
