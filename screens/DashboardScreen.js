import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IPAddress from "./IPAddress";

const DashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${IPAddress()}/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Server responded with status: " + response.status);
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#550003" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {dashboardData ? (
          <View style={styles.userInfo}>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                marginTop: 40,
                marginLeft: 40,
              }}
            >
              Hey !
            </Text>
            <Text style={styles.userInfoText}>{dashboardData.fullname}</Text>
          </View>
        ) : (
          <Text>Error: Dashboard data not available</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to the MapScreen
            navigation.navigate("LocationSelection");
          }}
        >
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/Outdoor_Navigation_Card_Image2.jpg")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>Campus Navigation Module</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to the Indoor Navigation Module
            navigation.navigate("IndoorLocationSelection");
          }}
        >
          <View style={styles.cardContainer}>
            <Text style={styles.underDevelopment}>Developing</Text>
            <Image
              source={require("../assets/Indoor_Navigation_Module2.jpg")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>Indoor Navigation Module</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to the Seating Arrangment Module
            navigation.navigate("Seating");
          }}
        >
          <View style={styles.cardContainer}>
            <Text style={styles.underDevelopment}>Under Development</Text>
            <Image
              source={require("../assets/Seating_Arrangement2.jpg")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>Seating Arrangment Module</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingTop: 0,
  },
  cardContainer: {
    borderRadius: 20,
    elevation: 3, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 3 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    overflow: "hidden",
    marginTop: 30,
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardImage: {
    width: "100%",
    height: 200,
    width: 350,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  userInfo: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#550003",
    width: "120%",
    height: 170,
  },
  userInfoText: {
    fontSize: 30,
    color: "#fff",
    marginTop: 10,
    marginLeft: 40,
    textAlign: "left",
  },
  linkButton: {
    backgroundColor: "#550003",
    color: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: 350,
    paddingHorizontal: 40,
    elevation: 3, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 3 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    overflow: "hidden",
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  underDevelopment: {
    color: "white",
    backgroundColor: "red",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 100,
    width: 350,
  },
});

export default DashboardScreen;
