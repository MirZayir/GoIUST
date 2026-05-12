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

import { COLORS } from "../constants/theme";
import { auth, db } from "../firebaseConfig";

export default function DashboardScreen() {
  const [studentData, setStudentData] = useState<any>(null);

  const fetchStudentData = async () => {
    try {
      const studentRef = doc(db, "users", "student_001");
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        setStudentData(studentSnap.data());
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

  const menuItems = [
    { title: "👤 Driver Info", path: "/driverInfo" },
    { title: "📍 Live Bus Tracking", path: "/liveTracking" },
    { title: "🚌 Missed Bus Recovery", path: "/missedBusRequest" },
    { title: "🚌 Bus Schedule", path: "/busSchedule" },
    { title: "💺 Seat Availability", path: "/seatAvailability" },
    { title: "⚠ Report Incident", path: "/reportIncident" },
    { title: "💬 In-App Chat", path: "/chat" },
    { title: "🔔 Transport Alerts", path: "/notifications" },
    { title: "🎫 Digital Bus Pass", path: "/busPass" },
    { title: "⚠ Emergency Contact", path: "../emergencyContact" },
    { title: "👤 Profile", path: "/profile" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.welcomeText}>
        Good Morning, {studentData?.name || "Student"} 👋
      </Text>

      <Text style={styles.subtitle}>Today's Route</Text>

      <Text style={styles.infoText}>
        Assigned Bus: {studentData?.assignedBus || "fetching bus details..."}
      </Text>

      <Text style={styles.infoText}>
        Pickup Stop: {studentData?.pickupStop || "fetching stop details..."}
      </Text>

      <Text style={styles.title}>IUST Smart Transport 🚌</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Live Transport Status</Text>
        <Text style={styles.statusText}>
          Bus: {studentData?.assignedBus || "fetching bus details..."}
        </Text>
        <Text style={styles.statusText}>
          Pickup: {studentData?.pickupStop || "fetching pickup location..."}
        </Text>
        <Text style={styles.statusText}>Status: On Route 🟢</Text>
        <Text style={styles.statusText}>ETA: 12 mins</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push(item.path as any)}
        >
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.card, styles.logoutCard]}
        activeOpacity={0.85}
        onPress={handleLogout}
      >
        <Text style={[styles.cardText, { color: COLORS.accent }]}>
          🚪 Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.lightText,
    marginBottom: 18,
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  statusCard: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
  },
  logoutCard: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
});
