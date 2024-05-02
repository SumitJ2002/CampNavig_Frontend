import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import Header from "./Header";
import IPAddress from "./IPAddress";

const SeatingScreen = () => {
  const [seatingArrangement, setSeatingArrangement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    fetchSeatingArrangement();
  }, []);

  const fetchSeatingArrangement = async () => {
    try {
      const response = await fetch(`${IPAddress()}/seats`);
      const data = await response.json();
      setSeatingArrangement(data);
    } catch (error) {
      console.error("Error fetching seating arrangement:", error);
      showToast("Error fetching seating arrangement");
    } finally {
      setLoading(false);
    }
  };

  const renderSeat = ({ item, index }) => {
    const row = Math.floor(index / 5);
    const col = index % 5;

    if (item === null) {
      return <Text style={styles.vacantSeat}>Vacant</Text>;
    } else {
      return (
        <Text style={styles.occupiedSeat}>
          {item.name} ({item.rollNumber})
        </Text>
      );
    }
  };

  const handleReserveSeat = async () => {
    try {
      if (!row || !col || !name || !rollNumber) {
        showToast("All fields are required");
        return;
      }

      const response = await fetch(`${IPAddress()}/seats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: parseInt(row - 1),
          col: parseInt(col - 1),
          name,
          rollNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchSeatingArrangement();
        setShowModal(false);
      } else {
        showToast(data.error);
      }
    } catch (error) {
      console.error("Error reserving seat:", error);
      showToast("An unexpected error occurred. Please try again later.");
    }
  };

  const handleReleaseSeat = async () => {
    try {
      if (!row || !col) {
        showToast("Row and Column are required");
        return;
      }

      const response = await fetch(
        `${IPAddress()}/seats/${row - 1}/${col - 1}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        fetchSeatingArrangement();
        setShowModal(false);
      } else {
        showToast(data.error);
      }
    } catch (error) {
      console.error("Error releasing seat:", error);
      showToast("An unexpected error occurred. Please try again later.");
    }
  };

  const openModal = (mode) => {
    setModalMode(mode);
    setRow("");
    setCol("");
    setName("");
    setRollNumber("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Seating Arrangement" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#550003" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Seating Arrangement" />
      <FlatList
        data={seatingArrangement.flat()}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
        renderItem={renderSeat}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("reserve")}
        >
          <Text style={styles.buttonText}>Reserve Seat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("release")}
        >
          <Text style={styles.buttonText}>Release Seat</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Header
            title={modalMode === "reserve" ? "Reserve Seat" : "Release Seat"}
          />
          {modalMode === "reserve" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Row"
                keyboardType="numeric"
                onChangeText={(text) => setRow(text)}
                value={row}
              />
              <TextInput
                style={styles.input}
                placeholder="Column"
                keyboardType="numeric"
                onChangeText={(text) => setCol(text)}
                value={col}
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TextInput
                style={styles.input}
                placeholder="Roll Number"
                onChangeText={(text) => setRollNumber(text)}
                value={rollNumber}
              />
            </>
          )}
          {modalMode === "release" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Row"
                keyboardType="numeric"
                onChangeText={(text) => setRow(text)}
                value={row}
              />
              <TextInput
                style={styles.input}
                placeholder="Column"
                keyboardType="numeric"
                onChangeText={(text) => setCol(text)}
                value={col}
              />
            </>
          )}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={
                modalMode === "reserve" ? handleReserveSeat : handleReleaseSeat
              }
            >
              <Text style={styles.modalButtonText}>
                {modalMode === "reserve" ? "Reserve" : "Release"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  seat: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  vacantSeat: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#d3d3d3",
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  occupiedSeat: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#ffcccc",
    textAlign: "center",
    color: "#550003",
    fontWeight: "bold",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#550003",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#550003",
    padding: 15,
    borderRadius: 5,
    width: "40%",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SeatingScreen;
