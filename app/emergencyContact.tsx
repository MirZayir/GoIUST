import { StyleSheet, Text, View } from "react-native";

export default function EmergencyContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contact ☎</Text>

      <Text style={styles.info}>Transport Office: +91 XXXXX XXXXX</Text>

      <Text style={styles.info}>Security Office: +91 XXXXX XXXXX</Text>
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
    marginBottom: 30,
    textAlign: "center",
  },

  info: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 18,
  },
});
