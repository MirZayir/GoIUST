import { db } from "@/firebaseConfig";
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
export default function ManageRoutesScreen() {
  const [route, setRoute] = useState("");
  const [time, setTime] = useState("");

  const handleSave = async () => {
    if (!route || !time) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "buses"), {
        routeName: route,
        busTime: time,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Route saved to Firebase 🚌");

      setRoute("");
      setTime("");
    } catch (error) {
      Alert.alert("Error", "Failed to save route");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚌 Manage Bus Routes</Text>

      <TextInput
        placeholder="Enter Route Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={route}
        onChangeText={setRoute}
      />

      <TextInput
        placeholder="Enter Bus Timing"
        placeholderTextColor="#999"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Route</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
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
    color: "black",
  },
});
