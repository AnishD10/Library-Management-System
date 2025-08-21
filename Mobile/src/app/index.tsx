import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAuth } from "../Context/AuthContext";
import { fetchEmployeeId } from "../features/requestSlice/attendanceRequestSlice";
import { AppDispatch } from "./store";
import WelcomeScreen from "./welcome"; // Adjust path as needed

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEmployeeId());
  }, [dispatch]);

  const { isAuthenticated, isLoading, showSplash, handleSplashDone } =
    useAuth();

  // Debugging: Log current state
  // console.log("Index State:", {
  //   isLoading,
  //   showSplash,
  //   isAuthenticated,
  // });

  // if (showSplash) {
  //   return <WelcomeScreen onDone={handleSplashDone} />;
  // }

  // if (isLoading) {
  //   return <ActivityIndicator size="large" />;
  // }

  // return <Redirect href={isAuthenticated ? "/home" : "/auth"} />;
  // return <Stack screenOptions={{ headerShown: false }} />;

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1, // CRITICAL: Add flex:1
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white", // Add background
        }}
      >
        <ActivityIndicator size={"large"} />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (showSplash) {
    return <WelcomeScreen onDone={handleSplashDone} />;
  }

  // You can customize Stack screens based on authentication
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Redirecting to {isAuthenticated ? "Home" : "Auth"}...
      </Text> */}
      <ActivityIndicator size={"large"} />

      <Redirect href={isAuthenticated ? "/userDashboard" : "/mainAuth"} />
      {/* <Redirect href="/_sitemap" />; */}
    </View>
    // <Redirect href={isAuthenticated ? home : auth} />
    // <Stack
    //   initialRouteName={isAuthenticated ? "/home" : "/auth"}
    //   screenOptions={{ headerShown: false }}
    // />
  );
}
