import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { TouchableOpacity, Text, Image, ToastAndroid } from "react-native";

import LoginScreen from "./screens/LoginScreen"; // Importing LoginScreen from its correct file
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LocationSelectionScreen from "./screens/LocationSelectionScreen";
import MapScreen from "./screens/MapScreen";
import IndoorMapScreen from "./screens/IndoorMapScreen";

const Stack = createStackNavigator();

export default function App() {
  function LogoTitle() {
    return (
      <Image
        style={{ width: 45, height: 45, marginLeft: 17 }}
        source={require("./assets/MGMLogo.png")}
      />
    );
  }
  // Inside your App component
  const handleLogout = (navigation) => {
    // Display toast message
    ToastAndroid.show("Logged out", ToastAndroid.SHORT);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.SlideFromRightIOS, // Apply left-to-right animation
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Log In",
            headerLeft: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Sign Up", headerLeft: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: "Dashboard",
            headerLeft: (props) => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: "#ffffff", // Header background color
              // iOS shadow properties
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3.84,
              // Android elevation
              elevation: 5,
            },
            headerTintColor: "black", // Adjusts the color of the back button and title
            headerTitleStyle: {
              color: "black", // Adjust the title color if needed
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={{
                  color: "#fff",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  marginRight: 15,
                  borderRadius: 19,
                  borderRadius: 19,
                  backgroundColor: "#ffffff",
                  // For iOS Shadow
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  // For Android elevation
                  elevation: 8,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            ),
            headerTitleStyle: { color: "black" },
          })}
        />
        <Stack.Screen
          name="LocationSelection"
          component={LocationSelectionScreen}
          options={{ title: "Select Locations" }}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen
          name="IndoorMap"
          component={IndoorMapScreen}
          options={{ title: "Indoor Map" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
