import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ title }) => {
  // Accepts title as a prop
  return (
    <View style={styles.header}>
      <Image source={require("../assets/MGMLogo.png")} style={styles.logo} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#550003",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    marginLeft: 5,
  },
});

export default Header;
