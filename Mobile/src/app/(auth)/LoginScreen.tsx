import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      interface LoginResponse {
        token: string;
        [key: string]: any;
      }
      const res = await axios.post<LoginResponse>("https://library-management-system-ylrf.onrender.com/api/users/login", form);
      // Save token to secure storage
      if (res.data?.token) {
        await SecureStore.setItemAsync("token", res.data.token);
      }
      setMessage("Login successful!");
      setTimeout(() => {
        router.replace("/(borrower)/HomeScreen");
      }, 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" onChangeText={v => setForm(f => ({ ...f, email: v }))} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry onChangeText={v => setForm(f => ({ ...f, password: v }))} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/RegisterScreen")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 40 },
  input: { backgroundColor: "#232323", color: "#fff", borderRadius: 8, padding: 12, marginVertical: 8, width: 260, borderWidth: 1, borderColor: "#444" },
  button: { backgroundColor: "#DC143C", padding: 14, borderRadius: 8, marginVertical: 10, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  link: { color: "#DC143C", marginTop: 10 },
  message: { color: "#fff", marginTop: 10 }
});