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
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={Home}/>
                <HomeStack.Screen name="Comentario" component={Comentario}/>
            </HomeStack.Navigator>
        )
    }

function Navegacion(){
    return(
        <Tab.Navigator>

            <Tab.Screen
                name="Home" 
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