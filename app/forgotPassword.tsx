import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password 🔐</Text>

      <TextInput placeholder="Enter your email" style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
