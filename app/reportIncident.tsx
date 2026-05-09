import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ReportIncidentScreen() {
  const [issue, setIssue] = useState("");

  const submitReport = async () => {
    if (!issue) {
      Alert.alert("Error", "Please describe the issue");
      return;
    }

    try {
      await addDoc(collection(db, "incidentReports"), {
        issue: issue,
        timestamp: new Date(),
        status: "Pending",
      });

      Alert.alert("Success", "Incident Report Submitted ⚠️");
      setIssue("");
    } catch (error) {
      Alert.alert("Error", "Failed to submit report");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Incident ⚠️</Text>

      <TextInput
        placeholder="Describe the issue"
        placeholderTextColor="#999"
        multiline
        numberOfLines={5}
        value={issue}
        onChangeText={setIssue}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={submitReport}>
        <Text style={styles.buttonText}>Submit Report</Text>
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

  input: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    minHeight: 150,
    fontSize: 18,
    textAlignVertical: "top",
    marginBottom: 20,
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
