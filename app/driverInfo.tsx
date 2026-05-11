import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../firebaseConfig";

export default function DriverInfoScreen() {
  // 1. STATE VARIABLES go at the very top of the component
  const [driverData, setDriverData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2. THE FETCH FUNCTION goes right after your state
  const fetchDriverData = async () => {
    try {
      const driverRef = doc(db, "users", "driver_001");
      const driverSnap = await getDoc(driverRef);

      if (driverSnap.exists()) {
        setDriverData(driverSnap.data());
      }
    } catch (error) {
      console.log("Driver Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. THE USEEFFECT goes after the function it calls
  useEffect(() => {
    fetchDriverData();
  }, []);

  // 4. THE LOADING CHECK goes right before the main return
  // This intercepts the render and shows the loading screen if data is still fetching
  if (loading) {
    return (
      <View style={styles.container}>
        {/* Pro-tip: Added text styles here so it's visible against your dark blue background */}
        <Text style={{ color: "white", textAlign: "center" }}>
          Loading driver information...
        </Text>
      </View>
    );
  }

  // 5. YOUR MAIN RETURN stays at the bottom
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Information 👨‍✈️</Text>

      <View style={styles.card}>
        {/* Once your data is fetching, you can replace the hardcoded text with your state! */}
        <Text style={styles.info}>
          Driver Name: {driverData?.name || "Abdul Rashid"}
        </Text>
        <Text style={styles.info}>
          Contact: {driverData?.contact || "+91 XXXXX XXXXX"}
        </Text>
        <Text style={styles.info}>
          Bus Number: {driverData?.busNumber || "JK01-1234"}
        </Text>
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
