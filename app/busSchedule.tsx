import { StyleSheet, Text, View } from "react-native";

export default function BusScheduleScreen() {
  const schedules = [
    { route: "Anantnag → IUST", time: "8:00 AM" },
    { route: "Pulwama → IUST", time: "8:15 AM" },
    { route: "Srinagar → IUST", time: "7:30 AM" },
    { route: "IUST → Anantnag", time: "4:30 PM" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Schedule 🕒</Text>

      {schedules.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.route}>{item.route}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}
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
    marginBottom: 30,
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
  },

  route: {
    fontSize: 18,
    fontWeight: "bold",
  },

  time: {
    fontSize: 16,
    marginTop: 8,
    color: "#444",
  },
});
