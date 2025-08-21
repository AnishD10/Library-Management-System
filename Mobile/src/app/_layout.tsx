import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AuthProvider } from "../Context/AuthContext";
import "./globals.css";
import store from "./store";

const Layout = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* reminder to self: every container should have flex-1, for React Native! */}
        <SafeAreaView className="flex-1 bg-white">
          <Slot />
        </SafeAreaView>
      </AuthProvider>
    </Provider>
  );
};

// debugging
// - took 2 hours to just debug Tailwindcss
// - worked when I just deleted the old tailwind config file and created a new
// - could try to delete node_modules as well

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // CRITICAL: Prevents black screen
//     backgroundColor: "red", // Add background color
//   },
// });

export default Layout;
