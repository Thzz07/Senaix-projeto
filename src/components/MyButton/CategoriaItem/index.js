import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { api } from "../../../services/api";
  import { useNavigation } from "@react-navigation/native";

export default function CategoriaItem({ data, updateCategories}) {

  const navigation = useNavigation();

const deleteItem = async () => {
    try {
        await api.delete(`categories/${data.id}`);
        Alert.alert("Sucesso", "Categoria Excluída Com Sucesso!")
        updateCategories();
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
    }
};
    

    return (
      
        <View style={styles.itemCategoria}>
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#fff" }}>{data.name}</Text>
            <View style={styles.buttonsCategoria}>
                <TouchableOpacity onPress={() => navigation.navigate("EditCategorias", {id :data.id})}>
                    <MaterialCommunityIcons name="pencil" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem()}>
                    <MaterialCommunityIcons name="trash-can" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: "center",
    borderRadius: 4,
  },
  itemCategoria:{
    marginTop:10,
    backgroundColor:"#00055C",
    borderRadius: 4,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  buttonsCategoria:{
    flexDirection: "row"
  }
});