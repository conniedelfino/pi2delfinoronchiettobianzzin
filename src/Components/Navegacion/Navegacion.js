import Home from "../../Screens/Home/Home";
import Post from "../../Screens/Post/Post";
import Perfil from "../../Screens/Perfil/Perfil";
import Comentario from "../../Screens/Comentario/Comentario";

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
            <Tab.Screen name="Home" component={HomeStackScreen} options={{title: "Home"}}/>
            <Tab.Screen name="Post" component={Post}/>
            <Tab.Screen name="Perfil" component={Perfil}/>
        </Tab.Navigator>
    )
}

export default Navegacion;