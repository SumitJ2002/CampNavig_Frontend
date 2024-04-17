import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "./Header";

const roomsData = [
  {
    id: 1,
    name: "Classroom 3",
    coordinate: { latitude: 19.01650809908107, longitude: 73.10456491423578 },
  },
  {
    id: 2,
    name: "Classroom 2",
    coordinate: { latitude: 19.016542332739, longitude: 73.10447908354878 },
  },
  // Add more rooms as needed
];

const IndoorMapScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="MGM's Indoor Navigation Module" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.016521294255057,
          longitude: 73.10477637595811,
          latitudeDelta: 0.001009,
          longitudeDelta: 0.001009,
        }}
      >
        {roomsData.map((room) => (
          <Marker
            key={room.id}
            coordinate={room.coordinate}
            title={room.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    height: "100%",
  },
});

export default IndoorMapScreen;
