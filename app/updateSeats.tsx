import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

export default function UpdateSeatsScreen() {
  const [occupiedSeats, setOccupiedSeats] = useState("");

  const handleUpdate = async () => {
    if (!occupiedSeats) {
      Alert.alert("Error", "Please enter occupied seats");
      return;
    }

    try {
      await updateDoc(doc(db, "busData", "mainBus"), {
        occupiedSeats: Number(occupiedSeats),
      });

      Alert.alert("Success", "Seat status updated successfully 💺");

      setOccupiedSeats("");
    } catch (error) {
      Alert.alert("Error", "Failed to update seat status");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Seat Status 💺</Text>

      <TextInput
        placeholder="Enter Occupied Seats"
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={styles.input}
        value={occupiedSeats}
        onChangeText={setOccupiedSeats}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Seats</Text>
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
