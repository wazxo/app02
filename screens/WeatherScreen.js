import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const lat = 18.4861; // Latitud de Santo Domingo
    const lon = -69.9312; // Longitud de Santo Domingo
    const apiKey = "3aa50ea2bf762264d3ef7f7e954b756f";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    setLoading(true); // Inicia el indicador de carga
    setError(null); // Resetea el error previo

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message); // Captura el mensaje de error de la API
      }
    } catch (err) {
      setError("No se pudo obtener los datos del clima. Intenta de nuevo.");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  return (
    <ImageBackground
      source={require("../assets/weather-background.jpg")} // Agrega una imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Obtener Clima</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#ffffff" />}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {weather && weather.main ? (
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{`Ciudad: Santo Domingo`}</Text>
            <Text style={styles.temperature}>
              {`Temp: ${(weather.main.temp - 273.15).toFixed(2)}°C`}
            </Text>
            <Text style={styles.description}>
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>
            No hay datos de clima disponibles
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cubrir todo el espacio
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    opacity: 0.9, // Hace que el fondo se vea más suave
  },
  button: {
    backgroundColor: "#4a90e2", // Azul
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 4, // Sombra del botón
  },
  buttonText: {
    color: "#fff", // Texto blanco
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherInfo: {
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco con opacidad
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  city: {
    fontSize: 28,
    color: "#333", // Texto gris oscuro
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 48,
    color: "#333", // Texto gris oscuro
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    color: "#555", // Texto gris más claro
    marginTop: 10,
    textTransform: "capitalize", // Capitaliza la primera letra de la descripción
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#777", // Texto gris claro
    marginTop: 10,
  },
});
