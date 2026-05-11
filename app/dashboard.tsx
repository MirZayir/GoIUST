import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db } from "../firebaseConfig";

export default function DashboardScreen() {
  const [studentData, setStudentData] = useState<any>(null);

  const fetchStudentData = async () => {
    try {
      const studentRef = doc(db, "users", "student_001");
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        useState<any>(null);
      }
    } catch (error) {
      console.log("Firebase Error:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Ok",
        onPress: async () => {
          await signOut(auth);
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.welcomeText}>
        Welcome, {studentData?.name || "Student"} 👋
      </Text>

      <Text style={styles.infoText}>
        Assigned Bus: {studentData?.assignedBus || "Loading..."}
      </Text>

      <Text style={styles.infoText}>
        Pickup Stop: {studentData?.pickupStop || "Loading..."}
      </Text>
      <Text style={styles.title}>IUST Smart Transport 🚍</Text>
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Live Bus Status</Text>

        <Text style={styles.statusText}>
          Bus: {studentData?.assignedBus || "Loading..."}
        </Text>

        <Text style={styles.statusText}>
          Pickup: {studentData?.pickupStop || "Loading..."}
        </Text>

        <Text style={styles.statusText}>Status: On Route 🟢</Text>

        <Text style={styles.statusText}>ETA: 12 mins</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/driverInfo")}
      >
        <Text style={styles.cardText}>👨‍✈️ Driver Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/liveTracking")}
      >
        <Text style={styles.cardText}>📍 Live Bus Tracking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/busSchedule")}
      >
        <Text style={styles.cardText}>🕒 Bus Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/seatAvailability")}
      >
        <Text style={styles.cardText}>💺 Seat Availability</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/reportIncident")}
      >
        <Text style={styles.cardText}>⚠ Report Incident</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/chat")}
      >
        <Text style={styles.cardText}>💬 In-App Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/notifications")}
      >
        <Text style={styles.cardText}>🔔 Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/busPass")}
      >
        <Text style={styles.cardText}>🎫 Digital Bus Pass</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("../emergencyContact")}
      >
        <Text style={styles.cardText}>☎ Emergency Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.cardText}>👤 Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleLogout}>
        <Text style={styles.cardText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: "#163D8C",
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#2D5BBF",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },

  statusTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },

  statusText: {
    fontSize: 16,
    color: "#E8F0FF",
    marginBottom: 6,
  },

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
    marginBottom: 30,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  welcomeText: {
    fontSize: 18,
    color: "#E0E0E0",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 16,
    color: "#D9E6FF",
    marginBottom: 4,
  },
});
