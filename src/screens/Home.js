import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/useAuth";

export default function Home(){
    const { user, signOut } = useAuth();
    return(
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:24}}>{user.username}</Text>
            <Text style={{fontSize:24}}>{user.email}</Text>
            <Text style={{fontSize:24}}>{user.role}</Text>

            <TouchableOpacity onPress={() => signOut()}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}