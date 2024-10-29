// app/CrearPreguntasAdmin.jsx
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function CrearPreguntasAdmin() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const apiCrearPregunta = 'https://6705358c031fd46a830f15c0.mockapi.io/api/v1/Preguntas';

    const crearPregunta = async () => {
        if (!pregunta || !respuesta) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        const nuevaPregunta = {
            pregunta,
            respuesta,
        };

        try {
            const response = await fetch(apiCrearPregunta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaPregunta),
            });

            if (!response.ok) {
                throw new Error('Error al crear la pregunta');
            }

            setPregunta('');
            setRespuesta('');
            Alert.alert('Éxito', 'Pregunta creada correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la pregunta. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Pregunta</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe la pregunta"
                value={pregunta}
                onChangeText={setPregunta}
            />
            <TextInput
                style={styles.input}
                placeholder="Escribe la respuesta"
                value={respuesta}
                onChangeText={setRespuesta}
            />
            <Button title="Crear Pregunta" onPress={crearPregunta} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#2C2C2C', // Fondo oscuro
        padding: 20 
    },
    title: { 
        fontSize: 28, 
        marginBottom: 20, 
        color: '#EAEAEA', // Color claro para el título
        fontWeight: 'bold' 
    },
    input: {
        height: 50,
        borderColor: 'white', // Color gris para el borde
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#444444', // Fondo de los inputs en gris oscuro
        color: '#EAEAEA', // Color claro para el texto
    },
});
