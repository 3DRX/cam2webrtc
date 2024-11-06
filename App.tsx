import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Button } from "react-native";
import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
  RTCView,
} from "react-native-webrtc";

const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

export default function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const getMedia = async () => {
    if (!stream) {
      let s: MediaStream;
      try {
        s = await mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(s);
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const startPeerConnection = async () => {
    const pc = new RTCPeerConnection(peerConstraints);
    pc.addEventListener("connectionstatechange", (e) => {
      switch (pc.connectionState) {
        case "closed":
          break;
      }
    });
    setPeerConnection(pc);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {stream && <RTCView streamURL={stream.toURL()} />}
        <View>
          <Button title="Get Video Stream" onPress={getMedia} />
          <Button title="Start Peer Connection" onPress={startPeerConnection} />
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
