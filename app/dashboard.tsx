import { router } from "expo-router";
import { signOut } from "firebase/auth";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function DashboardScreen() {
  // Moved handleLogout inside the component and fixed the missing closing brackets
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
      <Text style={styles.welcomeText}>Welcome back 👋</Text>
      <Text style={styles.title}>Student Dashboard 🚍</Text>

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
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 18,
    color: "#E0E0E0",
    marginBottom: 5,
  },
});
