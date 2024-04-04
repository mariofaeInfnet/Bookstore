import { View, Text, StyleSheet, Image } from "react-native";

export default function CardBook({ book }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{book.title}</Text>
      <Text>Autor: {book.author}</Text>
      <Text>Gênero: {book.genre}</Text>
      <Text>Ano: {book.publication_year}</Text>
      <Image style={styles.cardImage} source={{ uri: book.cover }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardImage: {
    width: 40,
    height: 40,
  },
});
