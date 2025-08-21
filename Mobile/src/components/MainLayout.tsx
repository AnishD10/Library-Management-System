import { IAppMainLayoutProps } from "@/src/interfaces";
import { View } from "react-native";
// import { KeyboardAvoidingView, Platform, View } from "react-native";

const MainLayout = ({ topSection, bottomSection }: IAppMainLayoutProps) => {
  return (
    <View className="bg-primary h-full w-full">
      <View className="h-[15%] w-full">{topSection}</View>
      <View
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={-100}
        className="h-[85%] flex-1 bg-background w-full rounded-t-[2rem] py-4 px-6"
      >
        {bottomSection}
      </View>
    </View>
  );
};

export default MainLayout;
