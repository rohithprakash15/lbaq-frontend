import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aadhar: "",
    phoneNumber: "",
    location: "",
    isOfficer: false,
  });
  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = async () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.aadhar ||
      !formData.phoneNumber ||
      !formData.location
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Store user details in AsyncStorage
      await AsyncStorage.setItem("userDetails", JSON.stringify(formData));
      Alert.alert("Success", "Signup successful. Details saved locally.");
      console.log("Signup Data:", formData);

      // Navigate to login page after successful signup
      navigation.navigate("login");
    } catch (error) {
      console.error("Error saving user details:", error);
      Alert.alert("Error", "Failed to save user details. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7f8c8d"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7f8c8d"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Aadhar"
        placeholderTextColor="#7f8c8d"
        value={formData.aadhar}
        onChangeText={(value) => handleInputChange("aadhar", value)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#7f8c8d"
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#7f8c8d"
        value={formData.location}
        onChangeText={(value) => handleInputChange("location", value)}
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleInputChange("isOfficer", !formData.isOfficer)}
        >
          {formData.isOfficer && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Are you an officer?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eaf6ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#dcdde1",
    color: "#2c3e50",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#7f8c8d",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: "#3498db",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#2c3e50",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#3498db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#007acc",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Signup;
