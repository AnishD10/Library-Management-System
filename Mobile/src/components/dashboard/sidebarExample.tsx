import { faBars, faBell, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SidebarExample = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-300));

  const toggleSidebar = () => {
    if (sidebarVisible) {
      // Close sidebar
      Animated.timing(sidebarAnimation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      // Open sidebar
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View className="h-[15%] w-full p-4 py-8 flex-row items-center justify-center bg-blue-600">
        <TouchableHighlight
          onPress={toggleSidebar}
          style={styles.iconButton}
          className="flex-1 h-12 w-12 rounded-xl items-center justify-center"
        >
          <FontAwesomeIcon
            icon={sidebarVisible ? faTimes : faBars}
            color="white"
            size={26}
          />
        </TouchableHighlight>
        <View className="flex-[6] px-4">
          <Text className="text-white font-bold text-2xl">HRM &</Text>
          <Text className="text-white font-bold text-2xl">
            Payroll Management
          </Text>
        </View>
        <TouchableHighlight
          style={styles.iconButton}
          className="flex-1 h-12 w-12 rounded-xl items-center justify-center"
        >
          <FontAwesomeIcon icon={faBell} color="white" size={26} />
        </TouchableHighlight>
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        <Text className="text-lg">Your main content goes here</Text>
      </View>

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Animated Sidebar */}
      {sidebarVisible && (
        <Animated.View
          style={[
            styles.sidebar,
            { transform: [{ translateX: sidebarAnimation }] },
          ]}
        >
          <View className="p-6">
            <Text className="text-2xl font-bold mb-6">Menu</Text>

            <TouchableHighlight
              className="py-3 border-b border-gray-200"
              underlayColor="#f0f0f0"
            >
              <Text className="text-lg">Dashboard</Text>
            </TouchableHighlight>

            <TouchableHighlight
              className="py-3 border-b border-gray-200"
              underlayColor="#f0f0f0"
            >
              <Text className="text-lg">Employees</Text>
            </TouchableHighlight>

            <TouchableHighlight
              className="py-3 border-b border-gray-200"
              underlayColor="#f0f0f0"
            >
              <Text className="text-lg">Payroll</Text>
            </TouchableHighlight>

            <TouchableHighlight
              className="py-3 border-b border-gray-200"
              underlayColor="#f0f0f0"
            >
              <Text className="text-lg">Settings</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "white",
    zIndex: 90,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
});

export default SidebarExample;
