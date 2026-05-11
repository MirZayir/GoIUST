import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function ViewReportsScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "incidentReports"));
      const reportList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportList);
    } catch (error) {
      console.log("Error fetching reports: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on screen load
  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolveReport = async (id: string) => {
    try {
      await updateDoc(doc(db, "incidentReports", id), {
        status: "Resolved",
      });

      Alert.alert("Success", "Report marked as Resolved ✅");

      fetchReports();
    } catch (error) {
      console.log("Error updating report: ", error);
      Alert.alert("Error", "Could not resolve the report.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incident Reports ⚠️</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.issue}>{item.message || item.issue}</Text>

            {item.studentName && (
              <Text style={styles.detail}>Student: {item.studentName}</Text>
            )}

            <Text style={styles.status}>Status: {item.status}</Text>

            {item.status !== "Resolved" && (
              <TouchableOpacity
                style={styles.resolveButton}
                onPress={() => handleResolveReport(item.id)}
              >
                <Text style={styles.resolveText}>✅ Mark as Resolved</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
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
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  issue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A2A66",
    marginBottom: 12,
    marginTop: 4,
  },
  resolveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  resolveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
