import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";

const NewsScreen = () => {
  const [location, setLocation] = useState("");
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNews = async () => {
    try {
      setErrorMessage(""); // Clear previous errors
      const response = await fetch(`http://127.0.0.1:8000/news/${location}`);
      console.log("Response Status:", response.status); // Debugging line
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Parsed Data:", data); // Debugging line
      if (data.length === 0) {
        setErrorMessage("No news available for this location.");
      }
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setErrorMessage("Failed to fetch news. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#7a9eae"
      />
      <Button title="Fetch News" onPress={fetchNews} color="#007acc" />
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer} // Added spacing above the list
          data={news}
          keyExtractor={(item, index) => index.toString()} // Use index as the unique key
          renderItem={({ item }) => (
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.title || "No Title"}</Text>
              <Text style={styles.newsDescription}>
                {item.description || "No Description"}
              </Text>
              {item.email && (
                <Text style={styles.newsEmail}>Posted by: {item.email}</Text>
              )}
              <Text style={styles.newsDepartment}>
                Department: {item.department || "N/A"}
              </Text>
              <Text style={styles.newsLocation}>
                Location: {item.location || "N/A"}
              </Text>
            </View>
          )}
        />
      )}
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
  newsItem: {
    marginBottom: 20, // Increased spacing between items
    padding: 15, // Increased padding inside each item
    backgroundColor: "#ffffff",
    borderRadius: 10, // Slightly rounded corners
    borderWidth: 1,
    borderColor: "#dcdde1",
    shadowColor: "#000", // Added shadow for better visual separation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  newsTitle: {
    fontSize: 20, // Slightly larger font for the title
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8, // Added spacing below the title
  },
  newsDescription: {
    fontSize: 16, // Slightly larger font for the description
    color: "#555",
    marginBottom: 8, // Added spacing below the description
  },
  newsDepartment: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginBottom: 8, // Added spacing below the department
  },
  newsLocation: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  newsEmail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8, // Added spacing below the email
  },
  listContainer: {
    marginTop: 20, // Added spacing between the button and the list
  },
});

export default NewsScreen;
