import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../firebaseConfig";

export default function DriverDashboardScreen() {
  const sendEmergencyAlert = async () => {
    try {
      await addDoc(collection(db, "notifications"), {
        type: "Emergency Alert",
        message: "Driver of IUST-07 reported an emergency situation 🚨",
        source: "driver_001",
        priority: "high",
        createdAt: new Date(),
        status: "active",
      });

      Alert.alert("Emergency Sent", "Admin has been notified 🚨");
    } catch (error) {
      Alert.alert("Error", "Failed to send emergency alert");
    }
  };
  const updateLocation = async () => {
    try {
      await updateDoc(doc(db, "buses", "bus_001"), {
        liveLatitude: 33.73,
        liveLongitude: 75.15,
        status: "On Route",
      });

      Alert.alert("Success", "Live location updated 📍");
    } catch (error) {
      Alert.alert("Error", "Failed to update location");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Dashboard 👨‍✈️</Text>

      <TouchableOpacity style={styles.button} onPress={updateLocation}>
        <Text style={styles.buttonText}>Update Live Location 📍</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Trip 🚍</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={sendEmergencyAlert}>
        <Text style={styles.buttonText}>Emergency Alert 🚨</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
