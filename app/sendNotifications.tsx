import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function SendNotificationsScreen() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendNotification = async () => {
    if (!message.trim() || !type.trim()) {
      Alert.alert("Error", "Please fill in both the message and the type.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "announcements"), {
        message: message,
        type: type,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success!", "Notification has been sent to all students.");
      setMessage("");
      setType("");
    } catch (error) {
      console.log("Send Notification Error:", error);
      Alert.alert(
        "Error",
        "Could not send the notification. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Notification 📢</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Notification Type</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Delay Alert, Emergency"
          placeholderTextColor="#999"
          value={type}
          onChangeText={setType}
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Type the announcement here..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendNotification}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Send Announcement</Text>
          )}
        </TouchableOpacity>
      </View>
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
    marginBottom: 25,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A2A66",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#163B7A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
