import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    "Welcome to IUST Transport Support 🚍",
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In-App Chat 💬</Text>

      <View style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            {msg}
          </Text>
        ))}
      </View>

      <TextInput
        placeholder="Type your message..."
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
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
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  chatBox: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 15,
    minHeight: 300,
    marginBottom: 20,
  },

  message: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
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
