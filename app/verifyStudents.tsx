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

export default function VerifyStudentsScreen() {
  const [studentName, setStudentName] = useState("");
  const [enrollment, setEnrollment] = useState("");

  const handleVerify = async () => {
    if (!studentName || !enrollment) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "verifiedStudents"), {
        name: studentName,
        enrollmentNo: enrollment,
        status: "Verified",
        verifiedAt: new Date(),
      });

      Alert.alert("Success", `${studentName} verified successfully ✅`);

      setStudentName("");
      setEnrollment("");
    } catch (error) {
      Alert.alert("Error", "Failed to verify student");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Students 👨‍🎓</Text>

      <TextInput
        placeholder="Student Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={studentName}
        onChangeText={setStudentName}
      />

      <TextInput
        placeholder="Enrollment Number"
        placeholderTextColor="#999"
        style={styles.input}
        value={enrollment}
        onChangeText={setEnrollment}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Student</Text>
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
