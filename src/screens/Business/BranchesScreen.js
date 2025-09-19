import { View, Text } from "react-native";

const BranchesScreen = ({ route }) => {
  const { businessId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Business branches {businessId} </Text>
    </View>
  );
};

export default BranchesScreen;
