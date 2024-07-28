import * as ExpoImageLabeling from "expo-image-labeling";

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageLabel } from "expo-image-labeling/ExpoImageLabeling.types";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [labels, setLabels] = useState<ImageLabel[]>([]);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!cameraReady) return;
    let isMounted = true;
    const processImage = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.1,
          // skipProcessing: true,
          // fastMode: true,
        });

        try {
          const newLabels = await ExpoImageLabeling.labelImageData(
            photo?.base64!
          );
          console.log(newLabels);
          if (isMounted) {
            setLabels(newLabels.labels);
          }
        } catch (error) {
          console.error("Error labeling image:", error);
        }
      }

      if (isMounted) {
        // Schedule the next frame
        requestAnimationFrame(processImage);
      }
    };

    processImage();

    return () => {
      isMounted = false;
    };
  }, [cameraReady]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        onCameraReady={() => setCameraReady(true)}
        style={styles.camera}
        facing={facing}
        animateShutter={false}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {labels[0]?.text} confidence: {labels[0]?.confidence.toFixed(2)}
          </Text>
          {/* {labels.map((label, index) => (
            <Text key={index} style={styles.label}>
              {label?.text}
            </Text>
          ))} */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  labelContainer: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
});
