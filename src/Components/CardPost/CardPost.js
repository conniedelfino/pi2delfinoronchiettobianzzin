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
        <View>
            <Text>{props.nombreUsuario}</Text>
            <Text>{props.texto}</Text>

            <Pressable onPress={()=> manejarLike()}>
                <Text>Me gusta ({listaLikes.length})</Text>
            </Pressable>

        </View>
    );
}

export default CardPost;