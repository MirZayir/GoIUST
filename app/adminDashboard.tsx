import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function AdminDashboardScreen() {
  const [emergencyCount, setEmergencyCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalBuses, setTotalBuses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const busesSnap = await getDocs(collection(db, "buses"));
        const reportsSnap = await getDocs(collection(db, "incidentReports"));
        const notificationSnap = await getDocs(collection(db, "notifications"));

        const students = usersSnap.docs.filter(
          (doc) => doc.data().role === "student",
        ).length;

        const emergencies = notificationSnap.docs.filter(
          (doc) => doc.data().priority === "high",
        ).length;

        setTotalStudents(students);
        setTotalBuses(busesSnap.size);
        setTotalComplaints(reportsSnap.size);
        setEmergencyCount(emergencies);
      } catch (error) {
        console.log("Analytics Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Transport Control Center 📊</Text>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>📊 Live Transport Analytics</Text>

        {loading ? (
          <ActivityIndicator
            color="white"
            size="large"
            style={{ marginVertical: 10 }}
          />
        ) : (
          <>
            <Text style={styles.analyticsText}>
              Total Students: {totalStudents}
            </Text>
            <Text style={styles.analyticsText}>Active Buses: {totalBuses}</Text>
            <Text style={styles.analyticsText}>
              Pending Complaints: {totalComplaints}
            </Text>
            <Text style={styles.analyticsText}>
              Emergency Alerts: {emergencyCount}
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/manageRoutes")}
      >
        <Text style={styles.cardText}>🚌 Manage Bus Routes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/viewRoutes")}
      >
        <Text style={styles.cardText}>📋 View Saved Routes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/verifyStudents")}
      >
        <Text style={styles.cardText}>👨‍🎓 Verify Students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/viewVerifiedStudents")}
      >
        <Text style={styles.cardText}>📋 View Verified Students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/viewReports")}
      >
        <Text style={styles.cardText}>⚠️ View Incident Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/updateSeats")}
      >
        <Text style={styles.cardText}>💺 Update Seat Status</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminAnnouncements")}
      >
        <Text style={styles.cardText}>🔔 View Announcements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/sendNotifications")}
      >
        <Text style={styles.cardText}>📢 Send Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.replace("/adminLogin")}
      >
        <Text style={styles.cardText}>🚪 Admin Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 80,
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 35,
    letterSpacing: 0.5,
  },
  analyticsCard: {
    backgroundColor: "#163D8C",
    padding: 22,
    borderRadius: 18,
    marginBottom: 25,
  },
  analyticsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  analyticsText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0A2A66",
  },
});
