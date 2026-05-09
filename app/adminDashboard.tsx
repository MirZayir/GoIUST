import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminDashboardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Admin Dashboard 👨‍💼</Text>

      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>📊 Admin Analytics</Text>

        <Text style={styles.analyticsText}>Total Students: 120</Text>

        <Text style={styles.analyticsText}>Pending Reports: 5</Text>

        <Text style={styles.analyticsText}>Total Routes: 8</Text>
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
        <Text style={styles.cardText}>⚠ View Incident Reports</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },

  analyticsCard: {
    backgroundColor: "#163B7A",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
  },

  analyticsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  analyticsText: {
    color: "white",
    fontSize: 16,
    marginBottom: 6,
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
