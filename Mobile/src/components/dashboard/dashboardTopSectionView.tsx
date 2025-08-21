import { IDashboardTopSection } from "@/src/interfaces";
import { Link } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

const dashboardTopSectionView = ({ item }: { item: IDashboardTopSection }) => {
  return (
    // <View className="flex-1">
    // <Shadow
    //   distance={8}
    //   startColor="#00000010"
    //   endColor="#00000001"
    //   offset={[0, 2]}
    //   // radius={6}
    //   style={{ width: "100%", borderRadius: 12, flex: 1 }}
    // >
    <Link href={item.link} className="flex-1">
      <View
        style={
          Platform.OS === "ios"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
                borderColor: item.color,
              }
            : {
                elevation: 3,
                borderColor: item.color,
              }
        }
        className="h-full w-full bg-white px-4 border-l-[6px] rounded-xl py-2"
      >
        {/* @ts-expect-error: <Svg /> */}
        <item.svg height={80} width={80} />
        {/* <View className="h-full w-full"> */}
        <Text
          className="font-bold text-primary text-xl"
          //   numberOfLines={1}
          //   ellipsizeMode="tail"
        >
          {item.title1}
        </Text>
        <Text
          className="font-bold text-primary text-xl"
          //   numberOfLines={1}
          //   ellipsizeMode="tail"
        >
          {item.title2}
        </Text>
        {/* </View> */}
      </View>
    </Link>
    // </Shadow>
    // </View>
  );
};

export default dashboardTopSectionView;
