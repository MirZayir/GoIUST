import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function SeatAvailabilityScreen() {
  const [totalSeats, setTotalSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [busData, setBusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSeatData();
  }, []);

  useEffect(() => {
    fetchSeatData();
  }, []);

  const fetchSeatData = async () => {
    try {
      const busRef = doc(db, "buses", "bus_001");
      const busSnap = await getDoc(busRef);

      if (busSnap.exists()) {
        setBusData(busSnap.data());
      }
    } catch (error) {
      console.log("Seat Error:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading seat availability...</Text>
      </View>
    );
  }

  const availableSeats = totalSeats - occupiedSeats;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Availability 💺</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Bus Number: {busData?.busNumber}</Text>

        <Text style={styles.info}>Total Capacity: {busData?.capacity}</Text>

        <Text style={styles.info}>
          Occupied Seats: {busData?.occupiedSeats}
        </Text>

        <Text style={styles.info}>
          Available Seats: {busData?.availableSeats}
        </Text>

        <Text style={styles.status}>Live Status: {busData?.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    padding: 20,
    justifyContent: "center",
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
    padding: 24,
    borderRadius: 18,
  },

  info: {
    fontSize: 18,
    marginBottom: 14,
    fontWeight: "500",
  },

  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
});
