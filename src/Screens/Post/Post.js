import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../../Firebase/config';

function Post(){
    const[descripcion,setDescripcion]=useState("")
    const[postError,setPostError]=useState("")

    function onSubmit(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: descripcion,
            createAt: Date.now(),
            listaLikes: [],
            comentarios: [],
        })
        .then(() => {
            setDescripcion("");
            setPostError("");
        })
        .catch(error => {
            setPostError('Fallo al crear el posteo.')
        })

        console.log("Descripcion", descripcion)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Crear nuevo post</Text>

            <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Escribí aquí tu comentario...'
            onChangeText={text => setDescripcion(text)}
            value={descripcion}/>

            {
                postError !== [] ?
                <Text>{postError}</Text> :
                null
            }

            <Pressable style={styles.botonForm} onPress={()=> onSubmit()}>
                <Text style={styles.textForm}>Publicar post</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        padding:20,
        margin:10,
        borderRadius:10,
    },
    title:{
        fontSize: 28,
        fontWeight:"bold",
        marginBottom:15,
        textAlign: "center"
    },
    textForm:{
        color: "#fff",
        fontWeight: "bold",
    },
    botonForm:{
        backgroundColor: "lightblue",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 6,
        marginTop: 10,
    },
    input:{
        height: 120,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        backgroundColor: "#fff"
    }
})

export default Post;