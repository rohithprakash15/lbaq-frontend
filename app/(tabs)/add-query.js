import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const AddQueryScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    department: "",
    location: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.title ||
      !formData.description ||
      !formData.department ||
      !formData.location
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/add-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      Alert.alert("Success", "Query posted successfully.");
      console.log("Response:", data);

      // Reset form after successful submission
      setFormData({
        email: "",
        title: "",
        description: "",
        department: "",
        location: "",
      });
    } catch (error) {
      console.error("Error posting query:", error);
      Alert.alert("Error", "Failed to post query. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post a New Query</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        keyboardType="email-address"
        placeholderTextColor="#7a9eae"
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={formData.title}
        onChangeText={(value) => handleInputChange("title", value)}
        placeholderTextColor="#7a9eae"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={formData.description}
        onChangeText={(value) => handleInputChange("description", value)}
        multiline
        numberOfLines={4}
        placeholderTextColor="#7a9eae"
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={formData.department}
        onChangeText={(value) => handleInputChange("department", value)}
        placeholderTextColor="#7a9eae"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={formData.location}
        onChangeText={(value) => handleInputChange("location", value)}
        placeholderTextColor="#7a9eae"
      />

      <Button title="Post Query" onPress={handleSubmit} color="#007acc" />
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
});

export default AddQueryScreen;
