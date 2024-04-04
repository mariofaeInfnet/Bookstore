import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CameraScreen from "../screens/CameraScreen";
import GalleryScreen from "../screens/GalleryScreen";

const Tabs = createBottomTabNavigator();

export default function PhotosTab() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="galeria" component={GalleryScreen} />
      <Tabs.Screen name="camera" component={CameraScreen} />
    </Tabs.Navigator>
  );
}
