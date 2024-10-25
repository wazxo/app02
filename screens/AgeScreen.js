import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function AgeScreen() {
  const [age, setAge] = useState(null);
  const [name, setName] = useState("");

  const fetchAge = async () => {
    if (!name) {
      Alert.alert("Por favor, ingresa un nombre.");
      return;
    }
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    setAge(data.age);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predicción de Edad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un nombre"
        onChangeText={setName}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={fetchAge}>
        <Text style={styles.buttonText}>Predecir Edad</Text>
      </TouchableOpacity>
      {age !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.ageCategory}>
            {age < 18 ? "Joven" : age < 60 ? "Adulto" : "Anciano"}
          </Text>
          <Image
            style={styles.ageImage}
            source={
              age < 18
                ? require("../assets/young.png")
                : age < 60
                ? require("../assets/adult.png")
                : require("../assets/elderly.png")
            }
          />
          <Text style={styles.ageText}>Edad: {age}</Text>
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
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  input: {
    height: 50,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  ageCategory: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#34495e",
  },
  ageImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  ageText: {
    fontSize: 18,
    color: "#555",
  },
});
