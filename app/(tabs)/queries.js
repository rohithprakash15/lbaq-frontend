import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";

const QueriesScreen = () => {
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/queries/${location}/${department}`
      );
      const data = await response.json();
      setQueries(data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queries</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#7a9eae"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter department"
        value={department}
        onChangeText={setDepartment}
        placeholderTextColor="#7a9eae"
      />
      <Button title="Fetch Queries" onPress={fetchQueries} color="#007acc" />
      <FlatList
        contentContainerStyle={styles.listContainer} // Added spacing above the list
        data={queries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.queryItem}>
            <Text style={styles.queryTitle}>{item.title}</Text>
            <Text style={styles.queryDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f7ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 20,
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
  queryItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdde1",
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
  listContainer: {
    marginTop: 20, // Added spacing between the button and the list
  },
});

export default QueriesScreen;
