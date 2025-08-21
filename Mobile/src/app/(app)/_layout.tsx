import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../Context/AuthContext";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (!isAuthenticated) return <Redirect href="/signIn" />;

  return (
    <View className="flex-1">
      <Slot />
    </View>
    // <View className="bg-primary h-full w-full">
    //   <View className="h-[15%] w-full">{topSection}</View>
    //   <View className="flex bg-white h-[85%] w-full rounded-t-[2rem]">
    //     {bottomSection}
    //   </View>
    // </View>
  );
}
