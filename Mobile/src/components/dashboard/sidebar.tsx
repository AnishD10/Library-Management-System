import { RootState } from "@/src/app/store";
import { dashboardSidebar } from "@/src/helpers/dummyDatas/dashboardData";
import { faBars, faBell, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SidebarFlatlist } from "./sidebarFlatList";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name, role } = useSelector(
    (state: RootState) => state.userData.currentUser
  );

  console.log(name, role);

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [animatedValue] = useState(new Animated.Value(-300));
  const { width } = Dimensions.get("window");

  const handleToggle = () => {
    if (openSidebar) {
      //handle close
      Animated.timing(animatedValue, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setOpenSidebar(false);
      });
    } else {
      setOpenSidebar(true);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View className="h-full w-full p-4 px-6 py-8 flex-row items-center justify-center">
      <TouchableHighlight
        onPress={handleToggle}
        underlayColor="#5e6bb7"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        className="flex-1 h-12 w-12 rounded-xl items-center justify-center"
      >
        <FontAwesomeIcon
          icon={faBars}
          color="white"
          size={26}
          // style={{ height: "24px" }}
        />
      </TouchableHighlight>
      <View className="flex-[6] px-4">
        <Text className=" text-white font-bold text-2xl">HRM &</Text>
        <Text className=" text-white font-bold text-2xl">
          Payroll Management
        </Text>
      </View>
      <TouchableHighlight
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        className="flex-1 h-12 w-12 rounded-xl items-center justify-center"
        underlayColor="#5e6bb7"
      >
        <FontAwesomeIcon
          icon={faBell}
          color="white"
          size={26}
          // style={{ height: "24px" }}
        />
      </TouchableHighlight>

      {openSidebar && (
        <Animated.View
          className="absolute top-0 left-0 h-screen-safe bg-background z-50"
          style={{
            transform: [{ translateX: animatedValue }],
            width: width * 0.8,
          }}
        >
          {/* <View className="p-6"> */}
          <View className="bg-primary rounded-b-3xl">
            <View className="flex-row rounded-b-3xl p-4 bg-background">
              <View className="flex-1 items-center">
                <Image
                  className="h-24 w-24 border-2 rounded-full border-secondary"
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/1.jpg",
                  }}
                />
                <Text className="text-textPrimary text-xl font-semibold">
                  {name}
                </Text>
                <Text className="text-textSecondary">{role}</Text>
              </View>
              <TouchableOpacity onPress={handleToggle}>
                <FontAwesomeIcon color="black" icon={faMultiply} size={20} />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-around py-4">
              <View className="items-center">
                <Text className="text-white font-bold text-xl">27</Text>
                <Text className="text-white">Employee</Text>
              </View>
              <View className="items-center gap-1">
                <Text className="text-white font-bold text-xl">12</Text>
                <Text className="text-white">Client</Text>
              </View>
              <View className="items-center gap-1">
                <Text className="text-white font-bold text-xl">50</Text>
                <Text className="text-white">Total Files</Text>
              </View>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{
              // backgroundColor: "#F8F9FA",
              // height: "100%",
              gap: 16,
              padding: 16,
            }}
            data={dashboardSidebar}
            renderItem={({ item }) => (
              <SidebarFlatlist item={item} dispatch={dispatch} />
            )}
          />
          {/* </View> */}
        </Animated.View>
      )}
    </View>
  );
};

export default Sidebar;
