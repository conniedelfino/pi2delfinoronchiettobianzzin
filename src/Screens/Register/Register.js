import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { db, auth } from '../../firebase/Config';

function Register(props){
    const[email,setEmail]=useState([])
    const[userName,setUserName]=useState([])
    const[password,setPassword]=useState([])
    const[register,setRegister]=useState([])
    const[registerError,setRegisterError]=useState([])

    function onSubmit(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            db.collection('users').add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
            })
            .then(() => {
                setRegister(true); 
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

            {
                registerError !== [] ?
                <Text>{registerError}</Text> :
                null
            }

            <Pressable style={styles.botonForm} onPress={()=> onSubmit(email, password, userName)}>
                <Text style={styles.textForm}>Registrarse</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        padding:10,
        margin:10,
    },
    title:{
        fontSize: 30,
        fontWeight:"bold",
        marginBottom:10
    },
    text:{
        fontSize:15,
        textAlign:"center",
        fontWeight:"bold",
    },
    boton:{
        backgroundColor: "lightblue",
        padding:12,
        borderRadius:5,
        marginBottom:10
    },
    textForm:{
        color: "#fff",
    },
    botonForm:{
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10, 
    }
})

export default Register