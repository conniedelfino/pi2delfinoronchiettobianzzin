import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from "../../Firebase/config"
import Post from '../../Screens/Post/Post';
import Comentar from "../../Components/Comentar/Comentar";

function Comentario(props) {
    
    const navigation = useNavigation();
    const [texto, setTexto] = useState("");
    const [Info, setInfo] = useState([]);
    const [comentarios, setComentarios]= useState([])
    const id = props.route.params
    console.log(id)

    useEffect(() => {
        db.collection('posts').where('id', '==', id).onSnapshot(
            docs => {
                let Post = [];
                docs.forEach(doc => {
                    Post.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    setInfo(Post)
                })
            }
        )
    
    db.collection('comentarios').where('id', '==', id).onSnapshot(
        docs=> {
            let comments =[];
            docs.forEach(doc=> {
                comments.push({
                    id: doc.id,
                    data:doc.data()
                })
                setComentarios(comments)
            })
        }
    )}
        , [])

    function Comentando() {
        db.collection('comentarios').add({
            owner: auth.currentUser.email,
            description: texto,
            createAt: Date.now(),
            id: id
        })
            .then()
            .catch(e => console.log(e));
    };

    return (
        <View>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Comentar
                        nombreUsuario={item.data.owner}   
                        texto={item.data.description}
                    />)}/>

            <TextInput
                value={texto}
                onChangeText={texto => setTexto(texto)}
            />
            <Pressable onPress={() => Comentando()}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    )
}

export default Comentario;
