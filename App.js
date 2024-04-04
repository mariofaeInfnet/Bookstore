import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import Routes from "./src/Routes";
import PhotosTab from "./src/navigations/PhotosTab";
import BooksListPage from "./src/screens/BooksListScreen";
import Login from "./src/screens/LoginScreen";
import Register from "./src/screens/Register";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? (
        <Drawer.Navigator>
          <Drawer.Screen
            name={Routes.BooksListPage}
            component={BooksListPage}
            options={{ title: "Listagem de Livros" }}
          />
          <Drawer.Screen
            name={Routes.PhotosTab}
            component={PhotosTab}
            options={{ title: "Galeria de Imagens" }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.Register}
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
