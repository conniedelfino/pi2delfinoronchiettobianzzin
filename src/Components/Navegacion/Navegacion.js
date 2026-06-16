import React, { useEffect} from "react";
import auth from "../../Firebase/config";
import Home from "../../Screens/Home/Home";
import Post from "../../Screens/Post/Post";
import Perfil from "../../Screens/Perfil/Perfil";
import Comentario from "../../Screens/Comentario/Comentario";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


function HomeStackScreen(){
        return(
            <HomeStack.Navigator screenOptions={{headerShown: false}}>
                <HomeStack.Screen name="Home" component={Home}/>
                <HomeStack.Screen name="Comentario" component={Comentario}/>
            </HomeStack.Navigator>
        )
    }

function Navegacion(props){
    useEffect(()=> {
        auth.onAuthStateChanged(user => {
            if (!user){
            props.navegation.navigate("Login");
            }
        });
    }, [])



    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>

            <Tab.Screen
                name="Inicio" 
                component={HomeStackScreen} 
                options={{
                    tabBarIcon: () => (
                        <Entypo name="home" size={24} color= "black" />
                    )
                }}
        />

            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name= "add-circle" size={24} color= "black" />
                    )
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name= "profile" size={24} color= "black" />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default Navegacion;