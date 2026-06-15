import React from "react";
import {View, Text, Pressable, StyleSheet} from "react-native";
import firebase from "firebase";
import {db, auth} from "../../Firebase/config";

function CardPost(props){
    const listaLikes = props.listaLikes;
    const userEmail = auth.currentUser.email;
    const esteLike = listaLikes.filter(email => email === userEmail);

    
    function doyLike(){
        db.collection("posts")
        .doc(props.id)
        .update({
            listaLikes: firebase.firestore.FieldValue.arrayUnion(userEmail)
        })
        .then(()=> {
            console.log("+ like");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function sacoLike(){
        db.collection("posts")
        .doc(props.id)
        .update({
            listaLikes: firebase.firestore.FieldValue.arrayRemove(userEmail)
        })
        .then(()=> {
            console.log("- like");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function manejarLike(){
        if (esteLike.length > 0){
            sacoLike();
        }else{
            doyLike();
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.user}>{props.nombreUsuario}</Text>
            <Text style={styles.text}>{props.texto}</Text>

            <Pressable onPress={()=> manejarLike()} style={styles.botonComent}>
                <Text style={styles.textComent}>Me gusta ({listaLikes.length})</Text>
            </Pressable>

            <Pressable onPress={()=> props.navegacion.navigate("Comentario", {id: props.id})}  style={styles.botonComent}>
                <Text style={styles.textComent}>Comentar</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
   container:{
        backgroundColor:"#fff",
        padding:15,
        margin:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    text:{
        fontSize:15,
        marginBottom: 8,
    },
    user:{
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 5,
    },
    textComent:{
        color: #fff,
        fontWeight: "bold",
    },
    botonComent:{
        backgroundColor: "lightblue",
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
        borderRadius: 4,
        margin: 5,
    },
})

export default CardPost;