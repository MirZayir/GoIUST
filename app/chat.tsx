import { addDoc, collection, getDocs } from "firebase/firestore";
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

interface Message {
  id: string;
  sender: string;
  text: string;
  busAssigned?: string;
  createdAt?: any;
}

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));

      const messageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));

      setMessages(messageList);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        sender: "Mir Zayir",
        text: message.trim(),
        busAssigned: "IUST-07",
        createdAt: new Date(),
      });

      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Community Chat 💬</Text>

      <FlatList
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet 🔔</Text>
        }
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Type message..."
        placeholderTextColor="#999"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  messageCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
