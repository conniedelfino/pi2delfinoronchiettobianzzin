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
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput  style={styles.input} 
                    keyboardType='email-address' 
                    placeholder='Ingresa aqui tu email' 
                    onChangeText={text => setEmail(text)} 
                    value={email}/>

            <TextInput  style={styles.input} 
                    placeholder='Ingresa aqui tu contraseña' 
                    onChangeText={text => setPassword(text)} 
                    value={password}
                    secureTextEntry={true}/>


            <Pressable style={styles.button} onPress={()=> onSubmit()}>
                <Text style={styles.buttonTexto}>Entrar a la App</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> props.navigation.navigate("Register")}>
                <Text style={styles.buttonTextoRegister}>No tengo cuenta</Text>
            </Pressable>
        
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        flex: 1,
        justifyContent: "center"
    },
    title:{
        fontSize: 25,
        margin: 10,
        textAlign: "center"
    },
    input:{
        borderColor: "black",
        padding: 15,
        margin: 5
    }, 
    button:{
        backgroundColor: "green",
        padding: 15,
        borderRadius: 7
    },
    buttonTexto:{
        textAlign: "center",
        color: "red"
    },
    error:{
        color: "red"
    }
})

export default Login;