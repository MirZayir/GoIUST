import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../firebaseConfig";

export default function SeatAvailabilityScreen() {
  const [totalSeats, setTotalSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);

  useEffect(() => {
    fetchSeatData();
  }, []);

  const fetchSeatData = async () => {
    try {
      const seatDoc = await getDoc(doc(db, "busData", "mainBus"));

      if (seatDoc.exists()) {
        const data = seatDoc.data();

        setTotalSeats(data.totalSeats || 40);
        setOccupiedSeats(data.occupiedSeats || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const availableSeats = totalSeats - occupiedSeats;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Availability 💺</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Total Seats: {totalSeats}</Text>
        <Text style={styles.info}>Occupied Seats: {occupiedSeats}</Text>
        <Text style={styles.info}>Available Seats: {availableSeats}</Text>

        <Text style={styles.status}>
          {availableSeats > 0 ? "Seats Available ✅" : "Bus Full ❌"}
        </Text>
      </View>
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

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
  },

  info: {
    fontSize: 20,
    marginBottom: 18,
    fontWeight: "600",
  },

  status: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
