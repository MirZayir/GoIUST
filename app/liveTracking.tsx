import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebaseConfig";

export default function LiveTrackingScreen() {
  const [busLocation, setBusLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusLocation = async () => {
      try {
        const busRef = doc(db, "buses", "bus_001");
        const busSnap = await getDoc(busRef);

        if (busSnap.exists()) {
          setBusLocation(busSnap.data());
        } else {
          console.log("No bus data found!");
        }
      } catch (error) {
        console.log("Error fetching location: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Bus Tracking 📍</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0A2A66" />
          <Text style={styles.loadingText}>Locating bus...</Text>
        </View>
      ) : busLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: busLocation.liveLatitude,
            longitude: busLocation.liveLongitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: busLocation.liveLatitude,
              longitude: busLocation.liveLongitude,
            }}
            title="IUST Bus"
            description={busLocation.status || "On Route"}
          />
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text style={styles.errorText}>Could not load bus location.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0A2A66",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#0A2A66",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
