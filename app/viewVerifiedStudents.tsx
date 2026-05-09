import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebaseConfig";

export default function ViewVerifiedStudentsScreen() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "verifiedStudents"));

    const studentList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setStudents(studentList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verified Students 👨‍🎓</Text>

      <FlatList
        data={students}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.info}>Enrollment: {item.enrollmentNo}</Text>

            <Text style={styles.status}>Status: {item.status}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    fontSize: 16,
    marginTop: 8,
  },

  status: {
    fontSize: 16,
    marginTop: 8,
    color: "green",
    fontWeight: "600",
  },
});
