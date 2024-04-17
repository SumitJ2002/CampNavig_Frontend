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

const RegisterScreen = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const ipAddress = IPAddress();

  const handleRegister = async () => {
    // Perform form validation
    if (!fullname || !username || !email || !password) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      return;
    }

    // Make an API call to register the user
    try {
      const response = await fetch(`${IPAddress()}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      // Check if the registration was successful
      if (response.ok) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigation.navigate("Login");
      } else {
        ToastAndroid.show(
          data.error || "Registration failed",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      ToastAndroid.show(
        "An unexpected error occurred. Please try again later.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/MGMLogo.png")} style={styles.logo} />
      <Text style={styles.title}>User Registration</Text>
      {/* Registration Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setFullname(text)}
          value={fullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.registrationButton}
          onPress={handleRegister}
        >
          <Text style={styles.registrationButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => {
          /* Handle navigation to Login screen */
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.loginText}>Have an account? Log in</Text>
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
  registrationButton: {
    backgroundColor: "#550003",
    padding: 10,
    borderRadius: 30,
  },
  registrationButtonText: {
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
  loginLink: {
    marginVertical: 10,
  },
  loginText: {
    fontSize: 12,
  },
});

export default RegisterScreen;
