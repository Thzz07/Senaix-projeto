import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from '../services/api'
import MyButton from "../components/MyButton";

const EditProdutos = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const [produtoNome, setProdutoNome] = useState("");
    const [produtoCategoria, setProdutoCategoria] = useState("");
    const [produtoQuantidade, setProdutoQuantidade] = useState("");
    const [produtoPreco, setProdutoPreco] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchProdutos();
    }, []);

    async function fetchCategories() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function fetchProdutos() {
        try {
            const response = await api.get(`products/${id}`);
            setProdutoNome(response.data.name);
            setProdutoQuantidade(String(response.data.amount));
            setProdutoPreco(String(response.data.value));
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function handleSubmit() {
        setError("");
        if (!produtoNome.trim() || !produtoQuantidade.trim() || !produtoPreco.trim()) {
            setError("Por favor, preencha todos os campos!");
            return;
        }
        if (produtoCategoria == []) {
            setError("Por favor, preencha o campo categoria!");
            return;
        }
        try {
            await api.patch(`products/${id}`, {
                name: produtoNome,
                amount: Number(produtoQuantidade),
                value: Number(produtoPreco),
                categoryId: Number(produtoCategoria)
            });
            Alert.alert("Sucesso", "Produto atualizado com sucesso!");
            setProdutoNome("");
            setProdutoQuantidade("");
            setProdutoPreco("");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível se conectar com o servidor");
            }
        }
    }
    return (
        <View style={style.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32} color="#FF8D68" />
                </TouchableOpacity>
                <Text style={{ color: "#FF8D68", fontSize: 29, fontWeight: 700, }}> EDITAR PRODUTOS</Text>
            </View>
            <View style={{}}>
                <View style={{}}>
                    <View style={style.inputBox}>
                        <TextInput
                            style={style.input}
                            placeholder="Nome do produto"
                            placeholderTextColor="#8a8787"
                            value={produtoNome}
                            onChangeText={(text) => setProdutoNome(text)}
                        />
                    </View>
                    <View style={style.inputBox}>
                        <TextInput
                            style={style.input}
                            placeholder="Quantidade"
                            placeholderTextColor="#8a8787"
                            value={produtoQuantidade}
                            onChangeText={(text) => setProdutoQuantidade(text)}
                        />
                    </View>
                    <View style={style.inputBox}>
                        <TextInput
                            style={style.input}
                            placeholder="Preço"
                            placeholderTextColor="#8a8787"
                            value={produtoPreco}
                            onChangeText={(text) => setProdutoPreco(text)}
                        />
                    </View>
                    <View style={style.inputPicker}>
                        <Picker style={style.picker} selectedValue={produtoCategoria} onValueChange={(itemValue) => setProdutoCategoria(itemValue)} >
                            <Picker.Item label="Selecione uma categoria" value="" />
                            {categorias.map((categoria, index) => (
                                <Picker.Item key={index} label={categoria.name} value={categoria.id} />
                            ))}
                        </Picker>
                    </View>
                    {error && <Text style={{color:"#fff", marginTop:10}}>{error}</Text>}
                </View>
                <MyButton
                    onPress={() => handleSubmit()}
                    text="Atualizar produto"
                    style={style.button}
                />

            </View>
        </View>
    )
}
export default EditProdutos;

const style = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#1B2C7C"
    },
    inputBox: {
        marginTop: 10,
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
        color: "#fff"
    },
    button: {
        marginTop: 10
    }, inputPicker: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FF8D68",
        borderRadius: 10,
        width: "100%",
    },

    picker: {
        flex: 1,
        fontSize: 18,
        color: "#AEAEB3"
    },
})