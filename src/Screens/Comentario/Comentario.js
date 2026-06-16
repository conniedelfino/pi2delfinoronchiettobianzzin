import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList, StyleSheet} from 'react-native';
import { db, auth } from "../../Firebase/config"
import Comentar from "../../Components/Comentar/Comentar";

function Comentario(props) {
    const [texto, setTexto] = useState("");
    const [comentarios, setComentarios]= useState([])
    const id = props.route.params.id
    console.log(id)

    useEffect(() => {
        db.collection('comentarios')
            .where('id', '==', id)
            .onSnapshot(docs=> {
                let comments =[];
                docs.forEach(doc=> {
                    comments.push({
                        id: doc.id,
                        data:doc.data()
                    });
                });
                setComentarios(comments);
            });
        }, [])

    function Comentando() {
        db.collection('comentarios').add({
            owner: auth.currentUser.email,
            description: texto,
            createAt: Date.now(),
            id: id
        })
            .then(()=> {
                setTexto("");
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Comentar
                        nombreUsuario={item.data.owner}   
                        texto={item.data.description}
                    />
                )}
            />

            <TextInput
                value={texto}
                onChangeText={texto => setTexto(texto)}
                style={styles.comentarioDelPost}
            />
            <Pressable onPress={() => Comentando()} style={styles.botonComentdelPost}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    comentarioDelPost: {
        backgroundColor: "rgb(168, 168, 220)",
        padding: 12,
        margin: 3,
        borderRadius: 5
    },
    botonComentdelPost:{
        backgroundColor: "#a8a7a7",
        padding: 3,
        borderRadius: 5,
        margin: 3
    }
})

export default Comentario;
