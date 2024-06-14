import { Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { useAuth } from "../context/useAuth";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ProdutoItem from "../components/MyButton/ProdutoItem"

import { api } from '../services/api'
import { Picker } from "@react-native-picker/picker";

export default function Produtos() {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchProdutos();
        fetchCategorias();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchProdutos();
        }, [])
    );

    async function fetchProdutos() {
        try {
            const response = await api.get('products');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    async function fetchCategorias() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    const filteredProdutos = produtos.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
        return matchesQuery && matchesCategory;
    })

    return (
        <ScrollView style={style.container}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#FF8D68", fontSize: 29, fontWeight: 700, marginTop: 20, marginLeft: 20 }}>PRODUTOS</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddProdutos")}>
                    <Ionicons name="add-circle" size={40} color="#FF8D68" style={{ marginTop: 20, marginRight: 20 }} />
                </TouchableOpacity>
            </View>
            <View style={style.inputBox}>
                <TextInput style={style.input} value={query} onChangeText={(text) => setQuery(text)} placeholder="Pesquise Seu Produto" placeholderTextColor="#AEAEB3"/>
            </View>
            <View style={style.inputPicker}>
                <Picker
                    selectedValue={selectedCategory}
                    style={style.picker}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Todas as categorias" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
            </View>
            <View style={{ padding: 10, gap: 10 }}>
                {filteredProdutos.map((produtos, index) => (
                    <ProdutoItem data={produtos} key={index} updateProducts={() => fetchProdutos()} />
                ))}
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B2C7C"
    },
    inputBox: {
        marginLeft:10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 2,
        borderColor: "#FF8D68",
        borderRadius: 10,
        width: "95%",
    },

    input: {
        flex: 1,
        fontSize: 18,
        color: "#fff"
    },
    inputPicker: {
        marginLeft:10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FF8D68",
        borderRadius: 10,
        width: "95%",
    },

    picker: {
        flex: 1,
        fontSize: 18,
        color: "#AEAEB3"
    },
})