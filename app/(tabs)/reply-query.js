import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ReplyQueryScreen = () => {
  const [department, setDepartment] = useState("");
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState("");
  const [email, setEmail] = useState("");

  const fetchQueries = async () => {
    if (!department) {
      Alert.alert("Error", "Please enter a department.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/queries/Chennai, India/${department}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setQueries(data);
      setSelectedQuery(null); // Reset selected query
    } catch (error) {
      console.error("Error fetching queries:", error);
      Alert.alert("Error", "Failed to fetch queries. Please try again later.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedQuery || !email || !response) {
      Alert.alert("Error", "Please fill in all fields and select a query.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/queries/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_id: selectedQuery._id,
          email,
          response,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      Alert.alert("Success", "Response posted successfully.");
      console.log("Response:", data);

      // Reset form after successful submission
      setResponse("");
      setEmail("");
      setSelectedQuery(null);
    } catch (error) {
      console.error("Error posting response:", error);
      Alert.alert("Error", "Failed to post response. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reply to a Query</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Department"
        value={department}
        onChangeText={setDepartment}
        placeholderTextColor="#7a9eae"
      />
      <Button title="Fetch Queries" onPress={fetchQueries} color="#007acc" />

      {queries.length > 0 && (
        <FlatList
          contentContainerStyle={styles.listContainer} // Added spacing above the list
          data={queries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.queryItem,
                selectedQuery?._id === item._id && styles.selectedQueryItem,
              ]}
              onPress={() => setSelectedQuery(item)}
            >
              <Text style={styles.queryTitle}>{item.title}</Text>
              <Text style={styles.queryDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedQuery && (
        <>
          <Text style={styles.selectedQueryText}>
            Selected Query: {selectedQuery.title}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#7a9eae"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Response"
            value={response}
            onChangeText={setResponse}
            multiline
            numberOfLines={4}
            placeholderTextColor="#7a9eae"
          />
          <Button
            title="Post Response"
            onPress={handleSubmit}
            color="#007acc"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e6f7ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#b3d9ff",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f0f8ff",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  queryItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdde1",
  },
  selectedQueryItem: {
    borderColor: "#007acc",
    borderWidth: 2,
  },
  queryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  queryDescription: {
    fontSize: 14,
    color: "#555",
  },
  selectedQueryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 20, // Added spacing between the button and the list
  },
});

export default ReplyQueryScreen;
