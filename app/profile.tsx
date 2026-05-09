import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile 👤</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Name: Mir Zayir Shabir</Text>
        <Text style={styles.info}>Enrollment No: MCA-24-02</Text>
        <Text style={styles.info}>Department: MCA</Text>
        <Text style={styles.info}>Bus Route: Anantnag → IUST</Text>
        <Text style={styles.info}>Contact: +91 XXXXX XXXXX</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✏️ Edit Profile</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    marginBottom: 18,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
