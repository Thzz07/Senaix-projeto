import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native"; 
import CategoriaItem from "../components/MyButton/CategoriaItem"

import { api } from '../services/api'

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const navigation = useNavigation();

    
    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
        }, [])
    );

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategorias(response.data);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    return (
        <ScrollView style={style.container}>
            <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{ color: "#FF8D68", fontSize: 29, fontWeight: 700, marginTop: 20, marginLeft:20}}>CATEGORIAS</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddCategorias")}>
                <Ionicons name="add-circle" size={40} color="#FF8D68" style={{marginTop:20, marginRight:20}} />
            </TouchableOpacity>
            </View>
             <View style={{ width:"100%",padding:15}}>
                {categorias.map((categoria, index) => (
                    <CategoriaItem data={categoria} updateCategories={() => fetchCategories()} key={index} />

                ))}
             </View>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B2C7C"
    }
})