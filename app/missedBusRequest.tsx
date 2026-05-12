import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function MissedBusScreen() {
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");

  const handleRequest = async () => {
    if (!location.trim() || !reason.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "boardingRequests"), {
        studentName: "Mir Zayir Shabir",
        assignedBus: "IUST-07",
        currentLocation: location.trim(),
        reason: reason.trim(),
        status: "Pending",
        createdAt: new Date(),
      });

      Alert.alert("Success", "Missed bus request submitted 🚌");

      setLocation("");
      setReason("");
    } catch (error) {
      console.error("Error submitting request:", error);
      Alert.alert("Error", "Failed to submit request");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Missed Bus Recovery 🚌</Text>

      <TextInput
        placeholder="Current Location"
        placeholderTextColor="#999"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        placeholder="Reason (missed pickup, delay etc.)"
        placeholderTextColor="#999"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Alternative Bus</Text>
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
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
});
