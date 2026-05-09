import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdminLoginScreen() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (!adminId || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Demo Admin Login
    if (adminId === "admin" && password === "123456") {
      Alert.alert("Success", "Admin Login Successful 👨‍💼");
      router.replace("/adminDashboard");
    } else {
      Alert.alert("Login Failed", "Invalid Admin Credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login 👨‍💼</Text>

      <TextInput
        placeholder="Enter Admin ID"
        placeholderTextColor="#999"
        value={adminId}
        onChangeText={setAdminId}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    justifyContent: "center",
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
