import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Importa createDrawerNavigator
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import GenderScreen from "../screens/GenderScreen";
import AgeScreen from "../screens/AgeScreen";
import UniversityScreen from "../screens/UniversityScreen";
import WeatherScreen from "../screens/WeatherScreen";
import NewsScreen from "../screens/NewsScreen";
import AboutScreen from "../screens/AboutScreen";
import { FontAwesome } from "@expo/vector-icons"; // Importa íconos

const Drawer = createDrawerNavigator(); // Crea el objeto del drawer
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="home" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Predicción de Género"
          component={GenderScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="female" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Predicción de Edad"
          component={AgeScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="clock-o" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Universidades por País"
          component={UniversityScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="university" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Clima"
          component={WeatherScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="sun-o" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Noticias"
          component={NewsScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="newspaper-o" size={20} color="#333" />
            ),
          }}
        />
        <Drawer.Screen
          name="Acerca de mí"
          component={AboutScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="user" size={20} color="#333" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
