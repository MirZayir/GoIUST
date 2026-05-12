import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>IUST Smart Transport 🚍</Text>

      <Text style={styles.subtitle}>Smart. Safe. Connected.</Text>

      <Text style={styles.loadingText}>Initializing transport services...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    color: "#DCE6FF",
    marginBottom: 20,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
});
