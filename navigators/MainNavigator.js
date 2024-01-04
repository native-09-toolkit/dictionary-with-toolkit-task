import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import WordsNavigation from "./WordsNavigation";
import LearningNavigation from "./LearningNavigation";
import Settings from "../screens/Settings";
import { StatusBar } from "react-native";
import { COLORS_DARK } from "../constants";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS_DARK.appBackground}
        barStyle={true ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleStyle: { fontWeight: "800" },
            tabBarActiveTintColor: COLORS_DARK.primary900,
            tabBarActiveBackgroundColor: COLORS_DARK.appBackground,
            tabBarInactiveBackgroundColor: COLORS_DARK.appBackground,
            headerStyle: {
              backgroundColor: COLORS_DARK.appBackground,
            },
            headerTintColor: COLORS_DARK.primary900,
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Words"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
            component={WordsNavigation}
          />
          <Tab.Screen
            name="Learning"
            component={LearningNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainNavigator;
