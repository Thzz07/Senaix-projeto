import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/useAuth";
import Logo from "../assets/logo.png";

export default function SignIn() {
  const navigation = useNavigation();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const { signIn } = useAuth();

  async function handleSubmit() {
    try{
      setError("")
      await signIn({email, password})
    }
    catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Falha No Login. Verifique Suas Credenciais.")
      }
    }
  }

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#FF8D68"/>
      </TouchableOpacity>
      <View style={{alignItems:"center"}}>
      <Image source={Logo} style={style.image}/>
      </View>
      <View style={{gap:16}}>
        <View style={style.inputBox}>
        <Feather name="mail" size={24} color="#FF8D68"/>
          <TextInput
        style={style.input}
        placeholder="Digite seu Email" 
        placeholderTextColor="#FF8D68"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        </View>
        <View style={style.inputBox}>
        <Feather name="lock" size={24} color="#FF8D68"/>
          <TextInput
        style={style.input}
        placeholder="Digite sua Senha" 
        placeholderTextColor="#FF8D68"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
        </View>
        {error && <Text style={{color:"#F8F8FF"}}>{error}</Text>}
        <MyButton onPress={handleSubmit} text="Login" style={{width:"100%"}}/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor:"#1B2C7C",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 16,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF8D68",
    borderRadius: 4,
    width: "100%",
  },

  input: {
    color:"#FF8D68",
    flex: 1,
    fontSize: 18,
  },
  erro: {
    color: "#F8F8FF",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
