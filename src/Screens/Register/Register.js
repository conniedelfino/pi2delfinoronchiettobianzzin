import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../../Firebase/config';

function Register(props){
    const[email,setEmail]=useState("");
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[registerError,setRegisterError]=useState("");

    function onSubmit(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            db.collection('users').add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
            })
            .then(() => {
                props.navigation.navigate("Login")
            })
            .catch( e => console.log(e))
        })     
        .catch( error => {
            setRegisterError(error.message)
        })

        console.log("Email", email)
        console.log("Username", userName)
        console.log("Password", password)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <Pressable style={styles.boton} onPress={()=> props.navigation.navigate("Login")}>
                <Text style={styles.text}>Ir a Login</Text>
            </Pressable>

            <TextInput style={styles.input}
            keyboardType='email-address'
            placeholder='Email'
            onChangeText={text => setEmail(text)}
            value={email}/>

            <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Username'
            onChangeText={text => setUserName(text)}
            value={userName}/>

            <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}/>

            <Text style={styles.error}>{registerError}</Text>

            <Pressable style={styles.botonForm} onPress={()=> onSubmit(email, password, userName)}>
                <Text style={styles.textForm}>Registrarse</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        padding:20,
        flex: 1,
        justifyContent:"center"
    },
    title:{
        fontSize: 30,
        fontWeight:"bold",
        marginBottom: 20,
        textAlign: "center"
    },
    text:{
        textAlign:"center",
        color: "white",
        fontWeight:"bold",
    },
    boton:{
        backgroundColor: "lightblue",
        padding: 15,
        borderRadius: 5,
        marginBottom: 5
    },
    textForm:{
        color: "#fff",
        fontWeight: "bold"
    },
    botonForm:{
        backgroundColor: "lightblue",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
        margin: 5
    },
    input:{
        padding: 15,
        margin: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5
    },
    error:{
        color: "red",
        textAlign:"center",
        marginTop: 10
    }
})

export default Register