import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Comentar(props){
    
    return(
        <View style={styles.container}>
            <Text style={styles.nombreUsuario}>{props.nombreUsuario}</Text>
            <Text style={styles.texto}>{props.texto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    nombreUsuario: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    texto: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    }
});

export default Comentar;