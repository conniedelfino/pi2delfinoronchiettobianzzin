import { View, Text, Pressable } from 'react-native';

function Login(props){
    return(
        <View>
            <Text>Login</Text>

            <Pressable onPress={()=> props.navigation.navigate("Register")}>
                <Text>Ir a Register</Text>
            </Pressable>
            <Pressable onPress={()=> props.navigation.navigate("Post")}>
                <Text>Ir a Post</Text>
            </Pressable>
            <Pressable onPress={()=> props.navigation.navigate("Navegacion")}>
                <Text>Entrar a la App</Text>
            </Pressable>
        </View>
    )
}

export default Login