import { Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import { Feather } from "@expo/vector-icons";
import {api} from "../services/api"
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButton";
import { useState } from "react";

export default function AddCategorias() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState("");
    const [error,setError] = useState("");

  async function handleSubmit(){
    setError("");
    if(!categorias.trim()){
      setError("Por Favor,Preencha Todos Os Campos!")
      return;
    }
    try{
      await api.post("categories", {
        name: categorias,
      });
      Alert.alert("Sucesso","Categoria Adicionada Com Sucesso!");
    }
    catch(error){
      if(error.response){
        setError(error.response.data.message);
      }
      setError("Não Foi Possível Se Conectar Com O Servidor");
    }
  }

    return (
        <View style={style.container}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={32} color="#FF8D68" />
            </TouchableOpacity>
            <Text style={{ color: "#FF8D68", fontSize: 29, fontWeight: 700,}}> ADICIONAR CATEGORIAS</Text>
            </View>
            <View style={style.inputBox}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#AEAEB3"
                    placeholder="Nome da Categoria"
                    value={categorias}
                    onChangeText={(text) => setCategorias(text)}
                />
            </View>
            <MyButton onPress={() => handleSubmit()} text="Adicionar Categoria" style={style.button} />
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#1B2C7C"
    },
    inputBox: {
        marginTop:10,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: "#FF8D68",
        borderRadius: 10,
        width: "100%",
      },
    
      input: {
        flex: 1,
        fontSize: 18,
        color:"#fff"
      },
      button:{
        marginTop:10
      }
})