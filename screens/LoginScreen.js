import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IPAddress from "./IPAddress";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Perform validation (e.g., check if username and password are not empty)
      if (!username || !password) {
        // Display an error toast message
        ToastAndroid.show(
          "Username and Password are required",
          ToastAndroid.SHORT
        );
        return;
      }

      // Send a request to your backend API for authentication
      const response = await fetch(`${IPAddress()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Parse the response JSON
      const data = await response.json();

      // Check if the authentication was successful
      if (response.ok) {
        // Navigate to the dashboard or home screen
        navigation.navigate("Dashboard");
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        // Display an error toast message
        ToastAndroid.show(
          data.error || "Login failed. Please try again.",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle any errors that occur during the login process
      ToastAndroid.show(
        "An unexpected error occurred. Please try again later.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/MGMLogo.png")} style={styles.logo} />
      <Text style={styles.title}>User Login</Text>
      {/* Login Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => {
          /* Handle navigation to Register screen */
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  input: {
    width: "100%",
    padding: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#550003",
    padding: 10,
    borderRadius: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  or: {
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    position: "relative",
    top: -13,
  },
  signupLink: {
    marginVertical: 10,
  },
  signupText: {
    fontSize: 12,
  },
});

export default LoginScreen;
