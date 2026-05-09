import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message) return;
    alert("Message Sent: " + message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 In-App Chat</Text>

      <TextInput
        placeholder="Type your message..."
        placeholderTextColor="#999"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
