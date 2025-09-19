import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { registerRequest } from "../../api/businesses";

const AddBusinessScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.location || !form.phone || !form.email) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const res = await registerRequest({name: form.name, location: form.location, phone: form.phone, email: form.email});
      if (res) {
        Alert.alert("Success", "Business registered successfully.");
        navigation.navigate("PrivateArea", { screen: "Welcome" });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error registering business.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f6f9" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Jobbi Tech"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Main Street 789"
          value={form.location}
          onChangeText={(text) => handleChange("location", text)}
        />

        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 555-9999"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: jobbi@tech.com"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4e73df",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
};

export default AddBusinessScreen;