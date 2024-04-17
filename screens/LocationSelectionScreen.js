import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Header from "./Header";

const LocationSelectionScreen = ({}) => {
  const [start, setStart] = useState("Gate");
  const [target, setTarget] = useState("Place12");

  const navigation = useNavigation();

  const handleShowMap = () => {
    // Handle navigation to the map screen with selected start and target
    navigation.navigate("Map", { start, target });
  };

  return (
    <View style={styles.container}>
      <Header title="MGM's Campus Navigation Module" />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Where you are:</Text>
        <Picker
          selectedValue={start}
          onValueChange={(itemValue) => setStart(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Gate" value="Gate" />
          <Picker.Item label="Engineering" value="Eng" />
          <Picker.Item label="Canteen" value="Canteen" />
          <Picker.Item label="Ground" value="Ground" />
          <Picker.Item label="Civil" value="Civil" />
          <Picker.Item label="Dental" value="Dental" />
          <Picker.Item label="Hospital" value="Hospital" />
          <Picker.Item label="Medical" value="Medical" />
          <Picker.Item label="Parking" value="Parking" />
          <Picker.Item label="Poshan" value="Poshan" />
          <Picker.Item label="Prosthetics And Orthotics" value="Pros" />
          <Picker.Item label="Staff Quarter" value="Quarter" />
        </Picker>
        <Text style={styles.label}>Where you want to go:</Text>
        <Picker
          selectedValue={target}
          onValueChange={(itemValue) => setTarget(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Engineering" value="Place11" />
          <Picker.Item label="Canteen" value="Place1" />
          <Picker.Item label="Ground" value="Place2" />
          <Picker.Item label="Civil" value="Place3" />
          <Picker.Item label="Dental" value="Place4" />
          <Picker.Item label="Hospital" value="Place5" />
          <Picker.Item label="Medical" value="Place6" />
          <Picker.Item label="Parking" value="Place7" />
          <Picker.Item label="Poshan" value="Place8" />
          <Picker.Item label="Prosthetics" value="Place9" />
          <Picker.Item label="Staff Quarter" value="Place10" />
          <Picker.Item label="Gate" value="Place12" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleShowMap}>
          <Text style={styles.buttonText}>Show Map</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    marginTop: 20,
    width: "80%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#550003",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  dashboardButton: {
    backgroundColor: "#550003",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
});

export default LocationSelectionScreen;
