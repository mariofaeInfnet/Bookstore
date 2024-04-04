import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

import Routes from "../Routes";
import firebase from "../Firebase";

export default function Login() {
  const [email, setEmail] = useState("jmafae@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  function signInUser() {
    setIsLoading(true);
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Sucesso", "Usuário Logado com sucesso!");
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <View style={styles.formContainer}>
          <Text>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text>Senha:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <Pressable onPress={() => signInUser()} style={styles.primaryButton}>
            <Text style={styles.buttonLabel}>Acessar</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate(Routes.Register)}>
            <Text style={styles.registerText}>Cadastrar-se</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  primaryButton: {
    margin: 10,
    padding: 2,
    ...Platform.select({
      android: {
        backgroundColor: "blue",
      },
      default: {
        backgroundColor: "#219ebc",
      },
    }),
  },
  buttonLabel: {
    textAlign: "center",
    color: "white",
  },
  registerText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
