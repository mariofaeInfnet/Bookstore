import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState, useRef } from "react";
import { Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";

import app from "../Firebase";

export default function CameraScreen() {
  const [hasPermission, setPermission] = useState(null);
  const cameraRef = useRef(null);
  const [uri, setUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.1 });

      setUri(photo.uri);
    }
  };

  const savePhoto = async () => {
    try {
      const firebaseStorage = getStorage(app);
      const name = `photo${new Date().getTime()}.jpeg`;
      const photoRef = ref(firebaseStorage, name);
      const response = await fetch(uri);
      const photo = await response.blob();
      const uploadResult = await uploadBytes(photoRef, photo);
      if (uploadResult) {
        Alert.alert("Sucesso", "Foto salva com sucesso!");
        setUri(null);
      } else {
        Alert.alert("Erro", "Erro ao salvar foto");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!uri && (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={cameraRef} />
          <Pressable onPress={takePicture} style={styles.button}>
            <Text style={styles.buttonText}>Capturar</Text>
          </Pressable>
        </View>
      )}
      {uri && (
        <View style={{ flex: 1 }}>
          <Image source={{ uri }} style={{ flex: 1 }} />
          <Pressable onPress={savePhoto} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
          <Pressable onPress={() => setUri(null)} style={styles.button}>
            <Text style={styles.buttonText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: "center",
    margin: 20,
    padding: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
});
