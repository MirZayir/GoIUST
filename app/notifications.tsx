import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebaseConfig";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const querySnapshot = await getDocs(collection(db, "announcements"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotifications(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications 🔔</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2A66",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  message: {
    fontSize: 18,
    fontWeight: "600",
  },
});
