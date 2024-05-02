import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import Header from "./Header";
import IPAddress from "./IPAddress";

const IndoorMapScreen = ({ route }) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { start, target } = route.params;

  useEffect(() => {
    async function fetchMapContent() {
      try {
        const response = await fetch(`${IPAddress()}/indoormap`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: start,
            target: target,
          }),
        });
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          const mapHtml = data.map;
          setHtmlContent(mapHtml);
        }
      } catch (error) {
        console.error("Error fetching map content:", error);
        ToastAndroid.show(
          "Error fetching map content:",
          error,
          ToastAndroid.SHORT
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMapContent();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="MGM's Indoor Navigation Module" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#550003" />
        </View>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Header title="MGM's Indoor Navigation Module" />
        <Text style={styles.messageText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="MGM's Indoor Navigation Module" />
      <WebView
        source={{ html: htmlContent || undefined }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default IndoorMapScreen;
