import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather } from "@expo/vector-icons"; // Iconos para eliminar, descargar y compartir
import * as FileSystem from "expo-file-system"; // Para descargar
import * as Sharing from "expo-sharing"; // Para compartir
import { useFocusEffect } from "@react-navigation/native";

const SettingsScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [imagenVisible, setImagenVisible] = useState(false); // Cambiado a false
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null); // Para descargar y compartir

  // Función para obtener los favoritos almacenados en AsyncStorage
  const obtenerFavoritos = async () => {
    const favs = await AsyncStorage.getItem("favoritos");
    if (favs) {
      setFavoritos(JSON.parse(favs));
    }
  };

  // Ejecuta obtenerFavoritos cada vez que se enfoca la pantalla
  useFocusEffect(
    React.useCallback(() => {
      obtenerFavoritos(); // Cambiado a obtenerFavoritos
    }, [])
  );

  // Función para eliminar un elemento de favoritos
  const eliminarFavorito = async (id) => {
    Alert.alert(
      "Eliminar Favorito",
      "¿Estás seguro de que quieres eliminar este favorito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            const nuevosFavoritos = favoritos.filter((item) => item.id !== id);
            setFavoritos(nuevosFavoritos);
            await AsyncStorage.setItem(
              "favoritos",
              JSON.stringify(nuevosFavoritos)
            );
          },
        },
      ]
    );
  };

  // Función para descargar la imagen
  const descargarImagen = async (uri, nombre) => {
    try {
      const fileUri = FileSystem.documentDirectory + `${nombre}.jpg`;
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
      Alert.alert("Descarga completada", "Imagen descargada en: " + localUri);
    } catch (error) {
      Alert.alert("Error", "No se pudo descargar la imagen.");
    }
  };

  // Función para compartir la imagen
  const compartirImagen = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + "imagenCompartida.jpg";
      await FileSystem.downloadAsync(uri, fileUri);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("Error", "No se pudo compartir la imagen.");
    }
  };

  // Función para abrir la imagen en grande
  const abrirImagen = (item) => {
    setImagenSeleccionada(item);
    setImagenVisible(true);
  };

  // Efecto para cargar los favoritos al montar el componente
  useEffect(() => {
    obtenerFavoritos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => abrirImagen(item)}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
      </TouchableOpacity>
      <Text style={styles.fraseTexto}>&ldquo;{item.texto}&rdquo;</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => descargarImagen(item.imagen, `favorito-${item.id}`)}
        >
          <Feather
            name="download"
            size={24}
            color="green"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => compartirImagen(item.imagen)}>
          <Feather name="share" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarFavorito(item.id)}>
          <AntDesign name="delete" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoritos.length > 0 ? (
        <FlatList
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.sinFavoritos}>No hay favoritos guardados</Text>
      )}

      {/* Modal para ver la imagen en grande */}
      <Modal visible={imagenVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setImagenVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
          {imagenSeleccionada && (
            <>
              <Image
                source={{ uri: imagenSeleccionada.imagen }}
                style={styles.imagenGrande}
              />
              <TouchableOpacity
                style={styles.descargarButton}
                onPress={() =>
                  descargarImagen(
                    imagenSeleccionada.imagen,
                    `favorito-${imagenSeleccionada.id}`
                  )
                }
              >
                <Text style={styles.descargarText}>Descargar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.compartirButton}
                onPress={() => compartirImagen(imagenSeleccionada.imagen)}
              >
                <Text style={styles.compartirText}>Compartir</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  fraseTexto: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 8,
  },
  sinFavoritos: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagenGrande: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  closeText: {
    fontSize: 18,
    color: "#333",
  },
  descargarButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  descargarText: {
    color: "#fff",
    fontSize: 18,
  },
  compartirButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  compartirText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SettingsScreen;
