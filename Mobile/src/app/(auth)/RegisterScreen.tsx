import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    try {
      await axios.post("http://192.168.18.199:3000/api/borrowers", form);
      setMessage("Your login credentials are sent to your email.");
      setTimeout(() => navigation.navigate("Login"), 1500);
    } catch (err) {
      if ((err as any).isAxiosError) {
        setMessage((err as any).response?.data?.message || "Registration failed");
      } else {
        setMessage("Registration failed");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#aaa" onChangeText={v => setForm(f => ({ ...f, name: v }))} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" onChangeText={v => setForm(f => ({ ...f, email: v }))} />
      <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#aaa" onChangeText={v => setForm(f => ({ ...f, phone: v }))} />
      <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#aaa" onChangeText={v => setForm(f => ({ ...f, address: v }))} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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