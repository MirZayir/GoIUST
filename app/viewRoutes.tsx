import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function ViewRoutesScreen() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRoutes();
  }, []);

  const deleteRoute = async (id: string) => {
    await deleteDoc(doc(db, "busRoutes", id));
    fetchRoutes();
  };

  const fetchRoutes = async () => {
    const querySnapshot = await getDocs(collection(db, "busRoutes"));
    const routeList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRoutes(routeList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Bus Routes 🚌</Text>

      <TextInput
        placeholder="Search route..."
        placeholderTextColor="#999"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={routes}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.route}>{item.routeName}</Text>
              <Text style={styles.time}>{item.busTime}</Text>
            </View>

            {/* Optional: Added a delete button so you can actually use the deleteRoute function */}
            <TouchableOpacity onPress={() => deleteRoute(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
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
    flexDirection: "row", // Added to put text and delete button side-by-side
    justifyContent: "space-between",
    alignItems: "center",
  },
  route: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 16,
    marginTop: 8,
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
