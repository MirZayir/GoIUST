import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdminAnnouncementsScreen() {
  const [message, setMessage] = useState("");

  const sendAnnouncement = () => {
    if (!message) {
      Alert.alert("Error", "Please enter announcement");
      return;
    }

    Alert.alert("Success", "Announcement sent to students 📢");

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Announcement 📢</Text>

      <TextInput
        placeholder="Enter announcement"
        placeholderTextColor="#999"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendAnnouncement}>
        <Text style={styles.buttonText}>Send Announcement</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
