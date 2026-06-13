import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { db, auth } from '../../Firebase/config';

function Post(){
    const[descripcion,setDescripcion]=useState([])
    const[post,setPost]=useState([])
    const[postError,setPostError]=useState([])

    function onSubmit(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: texto,
            createAt: Date.now(),
            likes: 0,
            listaLikes: [],
            comentarios: [],
        })
        .then(() => {
            setPost(true)
            setDescripcion([])
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
        padding:10,
        margin:10,
    },
    title:{
        fontSize: 30,
        fontWeight:"bold",
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
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10, 
    }
})

export default Post;