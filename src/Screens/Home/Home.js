import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { db, auth } from '../../Firebase/config';
import CardPost from '../../Components/CardPost/CardPost';

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createAt', 'desc')
            .onSnapshot(
                docs => {
                    const posts = [];
                    docs.forEach(doc => {
                        posts.push({
                            id: doc.id,
                            doc: doc.data()
                        });
                    });
                    setPosts(posts);
                    setLoading(false);
                    console.log(posts);
                }
        )
    }, []);

    return (
        <View style={styles.container}>
            {loading == true ? <ActivityIndicator size='large' color='green'/>:
            <FlatList
                data = {posts}
                keyExtractor = {item => item.id}
                renderItem = {({ item }) => (
                    <CardPost
                        nombreUsuario = {item.doc.owner}
                        texto = {item.doc.description}
                        listaLikes = {item.doc.listaLikes ? item.doc.listaLikes : []}
                        id = {item.id}
                        navegacion={props.navigation}
                    />
                )}    
            />
            }   
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        width: '100%',
        flex:1,
        padding: 10
    }
})

export default Home;