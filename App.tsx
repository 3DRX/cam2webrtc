import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Button } from "react-native";
import { mediaDevices, MediaStream, RTCView } from "react-native-webrtc";

export default function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const start = async () => {
    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {stream && <RTCView streamURL={stream.toURL()} />}
        <View>
          <Button title="Start" onPress={start} />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
