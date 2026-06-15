import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import {db, auth} from "../../Firebase/config"


function Perfil(props){
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [posts, setPosts] = useState("")

    useEffect(()=>{
        db.collection("users")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot(docs => { docs.forEach(doc => {
            setUserName(doc.data().userName);
            setEmail(doc.data().email);
            })     
        })
        db.collection("posts")
        .where("owner", "==", auth.currentUser.email)
        .onSnapshot(docs => {
            let postsUsuario = [];
            docs.forEach(doc => {
                postsUsuario.push({
                    id: doc.id,
                    data: doc.data()
        })
    })
    setPosts(postsUsuario)
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

            <Text style={styles.title}>Mis posteos</Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <view>
                    <Text>{item.data.description}</Text>
                    </view>
                }
/>
            <Pressable style={styles.button} onPress={()=> Logout()}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        flex:1,
        padding:20,
    },
    title:{
        fontSize:25,
        textAlign:"center",
        marginBottom:20,
        fontWeight:"bold"
    },
    text:{
        fontSize:16,
        marginBottom:8,
        textAlign:"center"
    },
    post:{
        backgroundColor:"#fff",
        padding:15,
        borderRadius:10,
        marginVertical:8,
        borderWidth:1,
        borderColor:"#ccc"
    },
    button:{
        backgroundColor:"#f4b6b6",
        padding:15,
        borderRadius:10,
        marginTop:20,
        width:"60%",
        alignSelf:"center"
    },
    buttonText:{
        textAlign:"center",
        fontWeight:"bold"
    }
})

export default Perfil