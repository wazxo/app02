import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function GenderScreen() {
  const [gender, setGender] = useState(null);
  const [name, setName] = useState("");

  const fetchGender = async () => {
    if (!name) {
      Alert.alert("Por favor, ingresa un nombre.");
      return;
    }
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();
    setGender(data.gender);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: gender === "male" ? "#3498db" : "#ff6b81" },
      ]}
    >
      <Text style={styles.title}>Predicción de Género</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un nombre"
        onChangeText={setName}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={fetchGender}>
        <Text style={styles.buttonText}>Predecir Género</Text>
      </TouchableOpacity>
      {gender && <Text style={styles.resultText}>{`Género: ${gender}`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#fff",
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
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#3498db",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
});
