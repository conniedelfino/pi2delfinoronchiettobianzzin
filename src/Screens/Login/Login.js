import { View, Text, Pressable } from 'react-native';

function Login(props){
    return(
        <View>
            <Text>Login</Text>

            <Pressable onPress={()=> props.navigation.navigate("Register")}>
                <Text>Ir a Register</Text>
            </Pressable>
        </View>
    )
}

export default Login