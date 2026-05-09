import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LiveTrackingScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6516,
          longitude: 75.1495,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 33.6516,
            longitude: 75.1495,
          }}
          title="University Bus"
          description="Live Bus Location 🚍"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});
