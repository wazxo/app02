import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function UniversityScreen() {
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [flagUrl, setFlagUrl] = useState("");

  const fetchUniversities = async () => {
    if (!country) {
      Alert.alert("Por favor, ingresa el nombre de un país.");
      return;
    }

    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      if (!response.ok) {
        throw new Error("Error fetching universities.");
      }
      const data = await response.json();
      setUniversities(data);
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching universities:", error);
      Alert.alert("Error fetching universities. Please try again.");
    }
  };

  const fetchCountrySuggestions = async () => {
    if (country.length < 2) {
      setSuggestions([]);
      setFlagUrl("");
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setSuggestions(data.map((country) => country.name.common));
        setFlagUrl(data[0].flags.png);
      } else {
        setSuggestions([]);
        setFlagUrl("");
      }
    } catch (error) {
      console.error("Error fetching country suggestions:", error);
      setSuggestions([]);
      setFlagUrl("");
    }
  };

  const handleSuggestionSelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setSuggestions([]);
    fetchUniversities();
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchCountrySuggestions();
    }, 300);
    return () => clearTimeout(debounceFetch);
  }, [country]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {flagUrl && <Image source={{ uri: flagUrl }} style={styles.flag} />}
        <TextInput
          style={styles.input}
          placeholder="Ingresa el país"
          onChangeText={setCountry}
          value={country}
        />
      </View>
      <Button
        title="Buscar Universidades"
        onPress={fetchUniversities}
        color="#4a90e2"
        disabled={!country}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
      <ScrollView style={styles.scrollView}>
        {universities.map((uni) => (
          <TouchableOpacity
            key={uni.name}
            style={styles.universityCard}
            onPress={() => Linking.openURL(uni.web_pages[0])}
          >
            <Text style={styles.universityName}>{uni.name}</Text>
            <Text style={styles.domainText}>{uni.domains[0]}</Text>
            <Text style={styles.linkText}>{uni.web_pages[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    flex: 1,
    marginRight: 10,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  suggestionList: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    marginTop: 10,
  },
  universityCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  universityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  domainText: {
    fontSize: 14,
    color: "#555",
  },
  linkText: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
