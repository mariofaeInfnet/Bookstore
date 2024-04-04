import { useFocusEffect } from "@react-navigation/native";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useState, useCallback } from "react";
import {
  Alert,
  Image,
  View,
  StyleSheet,
  FlatList,
  Share,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import app from "../Firebase";

export default function GalleryScreen() {
  const [photos, setPhotos] = useState([]);

  async function getPhotos() {
    try {
      const firebaseStorage = getStorage(app);
      const photosRef = ref(firebaseStorage);
      const list = await listAll(photosRef);
      const urls = [...photos];
      for (const fileRef of list.items) {
        const photoRef = ref(firebaseStorage, fileRef);
        const url = await getDownloadURL(photoRef);
        if (!urls.includes(url)) urls.push(url);
      }
      setPhotos(urls);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPhotos();
    }, []),
  );

  const sharePhoto = async (uri) => {
    try {
      const result = await Share.share({
        message: "Confira este livro",
        url: uri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {

          console.log("Compartilhado com sucesso");
        } else {

          console.log("Compartilhamento cancelado");
        }
      } else if (result.action === Share.dismissedAction) {

        console.log("Compartilhamento cancelado");
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Erro ao compartilhar", error.message);
    }
  };

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.image} source={{ uri: item }} />
            <TouchableOpacity onPress={() => sharePhoto(item)}>
              <Text>Compartilhar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
