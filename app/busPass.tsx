import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function BusPassScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Bus Pass 🚌</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Name: Mir Zayir Shabir</Text>

        <Text style={styles.info}>Enrollment: MCA-24-02</Text>

        <Text style={styles.info}>Department: MCA</Text>

        <Text style={styles.info}>Route: Anantnag → IUST</Text>

        <Text style={styles.status}>Verified Transport Pass ✅</Text>

        <View style={styles.qrContainer}>
          <QRCode value="MCA-24-02 | Mir Zayir Shabir | IUST-07" size={180} />

          <Text style={styles.qrText}>Scan for Verification</Text>
          <Text style={styles.footer}>Issued by IUST Transport Office</Text>
        </View>

        <Text style={styles.footer}>Issued by IUST Transport Department</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  qrText: {
    marginTop: 15,
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
  },

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
