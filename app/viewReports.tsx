import {
  collection,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "incidentReports"));

      const reportList: any[] = [];

      querySnapshot.forEach((doc) => {
        reportList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setReports(reportList);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id: string) => {
    await updateDoc(doc(db, "incidentReports", id), {
      status: "Resolved",
    });

    Alert.alert("Success", "Report marked as Resolved ✅");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incident Reports ⚠️</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.issue}>{item.issue}</Text>

            <TouchableOpacity onPress={() => updateStatus(item.id)}>
              <Text style={styles.status}>Status: {item.status}</Text>
            </TouchableOpacity>
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
  },

  issue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  status: {
    fontSize: 16,
    color: "gray",
  },
});
