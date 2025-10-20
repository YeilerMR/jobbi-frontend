import { useLayoutEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { deleteBusiness } from "../../api/businesses";

const BranchesScreen = ({ route }) => {
  const { businessId } = route.params;
  const navigation = useNavigation();

  const handleEdit = () => {
    Alert.alert("Soon", "Soon.");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Business",
      "Are you sure you want to delete this business?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await deleteBusiness(businessId);
              if (res) {
                Alert.alert("Success", "Business deleted successfully.");
                navigation.goBack();
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Error deleting business.");
            }
            
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 15, marginRight: 10 }}>
          <TouchableOpacity onPress={handleEdit}>
            <Ionicons name="create-outline" size={24} color="#4e73df" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, businessId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Business branches {businessId}</Text>
    </View>
  );
};

export default BranchesScreen;
