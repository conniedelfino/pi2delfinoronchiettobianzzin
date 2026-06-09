import Home from "../../Screens/Home/Home"
import Post from "../../Screens/Post/Post"
import Perfil from "../../Screens/Perfil/Perfil"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

function Navegacion(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Post" component={Post}/>
            <Tab.Screen name="Perfil" component={Perfil}/>
        </Tab.Navigator>
    )
}

export default Navegacion