import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Linking,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga

  const fetchNews = async () => {
    setLoading(true); // Inicia el indicador de carga
    try {
      const response = await fetch(
        "https://nintenderos.com/wp-json/wp/v2/posts?_embed"
      );
      const data = await response.json();
      setNews(data.slice(0, 10)); // Limita a 10 artículos
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Obtener Noticias" onPress={fetchNews} color="#4a90e2" />
      {loading && (
        <ActivityIndicator size="large" color="#4a90e2" style={styles.loader} />
      )}
      <ScrollView style={styles.scrollView}>
        {news.map((article) => (
          <View key={article.id} style={styles.article}>
            {article._embedded && article._embedded["wp:featuredmedia"] && (
              <Image
                source={{
                  uri: article._embedded["wp:featuredmedia"][0].source_url,
                }}
                style={styles.image}
              />
            )}
            <Text style={styles.title}>{article.title.rendered}</Text>
            <Text style={styles.excerpt}>
              {article.excerpt.rendered.replace(/<[^>]+>/g, "")}
            </Text>
            <Button
              title="Leer Más"
              onPress={() => Linking.openURL(article.link)}
              color="#4a90e2"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // Fondo gris claro
  },
  scrollView: {
    marginTop: 20,
  },
  article: {
    backgroundColor: "#fff", // Fondo blanco para los artículos
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Efecto de sombra en Android
  },
  image: {
    width: "100%", // Ancho completo
    height: 200, // Altura de la imagen
    borderRadius: 10, // Bordes redondeados para la imagen
    marginBottom: 10, // Espacio entre la imagen y el texto
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Color gris oscuro
  },
  excerpt: {
    fontSize: 16,
    color: "#555", // Color gris
    marginVertical: 10,
  },
  loader: {
    marginVertical: 20,
  },
});
