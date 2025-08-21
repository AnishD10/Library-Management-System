import logo from "@/assets/images/logo4.png";
import BuildingIcon from "@/assets/svgs/undraw_building.svg";
import Com from "@/assets/svgs/undraw_com.svg";
import EmployeeIcon from "@/assets/svgs/undraw_employee.svg";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {};

const mainAuth = (props: Props) => {
  return (
    <View className="flex-1 h-full w-full">
      <LinearGradient
        // className=""
        colors={["#FFFFFF", "#90a0ff"]}
      >
        <View className="h-full w-full items-center justify-center gap-6 p-4">
          <Image source={logo} className="h-48 w-48" />
          <Com height="250px" width="250px" />

          <Text className="font-semibold text-textPrimary text-3xl">
            Select Your Role
          </Text>
          <TouchableOpacity onPress={() => navigate("/signUp")}>
            <View className="flex-row h-24 w-full bg-white border-2 rounded-lg border-primary justify-center items-center p-2">
              <View className="flex-1">
                <BuildingIcon height="50px" width="50px" />
              </View>
              <View className="flex-[4]">
                <Text className="text-xl font-semibold text-textPrimary">
                  Business Owner / Admin / HR
                </Text>
                <Text className="text-textSecondary">
                  Register your company and bla bla bla
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("/signIn")}>
            <View className="flex-row h-24 w-full bg-white border-2 rounded-lg border-primary justify-center items-center p-2">
              <View className="flex-1">
                <EmployeeIcon height="50px" width="50px" />
              </View>
              <View className="flex-[4]">
                <Text className="text-xl font-semibold text-textPrimary">
                  Employee
                </Text>
                <Text className="text-textSecondary">
                  Login to your company and bla bla bla
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default mainAuth;
