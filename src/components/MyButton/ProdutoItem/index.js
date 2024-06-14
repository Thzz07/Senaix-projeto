import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { api } from "../../../services/api";
  import { useNavigation } from "@react-navigation/native";
  

export default function ProdutoItem({data, updateProducts}) {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [data]);
  async function fetchCategories() {
    try {
      const responseData = await api.get('categories');
      const response = responseData.data;
      const category = response.find(a => a.id === data.categoryId);
      if (category) {
        setCategorias(category.name);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
  const deleteItem = async () => {
    try {
        await api.delete(`products/${data.id}`);
        Alert.alert("Sucesso!", "Produto excluído com sucesso!");
        updateProducts();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
};

  return (
    <View style={styles.itemProduto}>
        <View style={{color:"#fff"}}>
          <Text style={{fontWeight: "800", fontSize: 22, color:"#fff"}}>{data.name}</Text>
          <Text style={{fontWeight: "500", fontSize: 18, color:"#fff"}}>{categorias}</Text>
          <Text style={{fontWeight: "500", fontSize: 18, color:"#fff"}}>R${data.value}</Text>
          <Text style={{fontWeight: "500", fontSize: 18, color:"#fff", position:"absolute", marginLeft:170, width:100, marginTop:30,textAlign:"center"}}>Quantidade: {data.amount}</Text>
        </View>
        <View style={styles.buttonsProduto}>
            <TouchableOpacity onPress={() => navigation.navigate("EditProdutos", { id: data.id })}>
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
      itemProduto:{
        marginTop:10,
        backgroundColor:"#00055C",
        borderRadius: 4,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      buttonsProduto:{
        flexDirection: "row"
      }
});
