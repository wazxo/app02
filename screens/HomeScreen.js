import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/toolbox.png")} style={styles.image} />
      <Text style={styles.description}>
        Esta aplicación permite predecir el género y la edad a partir de un
        nombre, mostrar universidades por país, consultar el clima y leer las
        últimas noticias.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7", // Fondo gris claro
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Efecto de sombra en Android
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#555", // Color gris oscuro
    lineHeight: 24, // Mayor espacio entre líneas
    paddingHorizontal: 20,
  },
});
