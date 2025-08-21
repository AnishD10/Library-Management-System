import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import "../globals.css";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (isAuthenticated) return <Redirect href="/userDashboard" />;

  return (
    <View className="flex-1">
      <Slot />
      {/* was getting String should be within <Text> error cuz I had a fucking ; after <Slot />, like so <Slot />; fucking hell! */}
    </View>
  );
}
