import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {db, auth} from "../../Firebase/config"

function Perfil(props){
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        db.collection("users")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot(docs => { docs.forEach(doc => {
            setUserName(doc.data().userName);
            setEmail(doc.data().email);
            })     
        })
    }, []);

    function Logout(){
        auth.signOut()
        .then(()=>{
            props.navigation.navigate("Login")
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.text}>Usuario: {userName}</Text>
            <Text style={styles.text}>Email: {email}</Text>

            <Pressable style={styles.button} onPress={()=> Logout()}>
                <Text style={styles.text}>Cerrar sesión</Text>
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
        marginBottom: 20,
        textAlign: "center"
    },
    text:{
        fontSize: 15,
        marginBottom: 10
    },
    button:{
        backgroundColor: "lightblue",
        padding: 15,
        borderRadius: 7,
        marginTop: 20
    },
    buttonText:{
        textAlign: "center",
        color: "white"
    }
})

export default Perfil