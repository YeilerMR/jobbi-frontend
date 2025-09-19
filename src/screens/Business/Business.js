import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getMyBusinesses } from "../../api/businesses";

const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyBusinesses();
        if (res && res?.data) {
          setBusinesses(res.data);
        }
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  const renderBusiness = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
      }}
      onPress={() => navigation.navigate("Sucursales", { businessId: item.id_business })}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 14, color: "#666" }}>{item.location}</Text>
      <Text style={{ fontSize: 14, color: "#666" }}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6f9", padding: 20 }}>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id_business.toString()}
        renderItem={renderBusiness}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
            No tienes negocios registrados
          </Text>
        }
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("AddBusiness")}
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          backgroundColor: "#4e73df",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Business;