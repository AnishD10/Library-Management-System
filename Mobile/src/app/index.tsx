import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to Welcome screen on app start
  return <Redirect href="/(borrower)/WelcomeScreen" />;
}