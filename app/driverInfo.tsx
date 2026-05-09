import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DriverInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Information 👨‍✈️</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Driver Name: Abdul Rashid</Text>

        <Text style={styles.info}>Contact: +91 XXXXX XXXXX</Text>

        <Text style={styles.info}>Bus Number: JK01-1234</Text>
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
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
  },

  info: {
    fontSize: 18,
    marginBottom: 15,
  },
});
