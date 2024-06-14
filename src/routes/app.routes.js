import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Produtos from "../screens/Produtos";
import AddProdutos from "../screens/AddProdutos";
import EditProdutos from "../screens/EditProdutos";
import AddCategorias from "../screens/AddCategorias";
import EditCategoras from "../screens/EditCategorias";
import Categorias from "../screens/Categorias";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="Produtos"
        component={Produtos}
      />
      <Stack.Screen name="AddProdutos" component={AddProdutos}/>
      <Stack.Screen name="EditProdutos" component={EditProdutos}/>
    </Stack.Navigator>
    
  );
}

function CategoriasStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="Categorias"
        component={Categorias}
      />
      <Stack.Screen name="AddCategorias" component={AddCategorias}/>
      <Stack.Screen name="EditCategorias" component={EditCategoras}/>
    </Stack.Navigator>
    
  );
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1B2C7C",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: "#FF8D68",
        tabBarInactiveBackgroundColor: "#FF8D68"
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "HomeStack",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="box"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CategoriasStack"
        component={CategoriasStack}
        options={{
          title: "CategoriasStack",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="window"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={45}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
