import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BusPassScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Bus Pass 🚌</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Name: Mir Zayir Shabir</Text>

        <Text style={styles.info}>Enrollment: MCA-24-02</Text>

        <Text style={styles.info}>Department: MCA</Text>

        <Text style={styles.info}>Route: Anantnag → IUST</Text>

        <Text style={styles.status}>Verified ✅</Text>

        <Text style={styles.footer}>Issued by IUST Transport Department</Text>
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

  footer: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontStyle: "italic",
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
    padding: 25,
    borderRadius: 18,
  },

  info: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "500",
  },

  status: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 20,
  },
});
