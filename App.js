import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Screens/Login/Login';
import Register from './src/Screens/Register/Register';
import Post from './src/Screens/Post/Post';
import Navegacion from './src/Components/Navegacion/Navegacion';


const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Post" component={Post}/>
                <Stack.Screen name="Navegacion" component={Navegacion}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

    const styles = StyleSheet.create({
        container:{
        backgroundColor:"#f95c5c",
        padding:10,
        margin:10,
    },
    })
}

export default App;