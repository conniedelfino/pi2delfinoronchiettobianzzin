import React, {useState} from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import {auth} from "../../Firebase/config";

function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onSubmit(){
        auth.signInWithEmailAndPassword(email, password)
        .then(()=> {
            setError("");
            props.navigation.navigate("Navegacion")
        })
        .catch(error => {setError(error.message)

        });
    }

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