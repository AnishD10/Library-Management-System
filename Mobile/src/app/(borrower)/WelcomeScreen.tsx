import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Library App</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/LoginScreen")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#232323" }]} onPress={() => router.push("/(auth)/RegisterScreen")}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 40 },
  button: { backgroundColor: "#DC143C", padding: 16, borderRadius: 8, marginVertical: 10, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});