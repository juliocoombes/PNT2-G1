import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CrearPreguntas() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const apiPreguntas = 'https://6705358c031fd46a830f15c0.mockapi.io/api/v1/Preguntas';

    const handleSubmit = async () => {
        console.log('Pregunta:', pregunta);
        console.log('Respuesta:', respuesta);

        try {
            const body = JSON.stringify({
                pregunta: pregunta,
                respuesta: respuesta,
            });

            const response = await fetch(apiPreguntas, { // Fixed the variable name from apiUrl to apiPreguntas
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Pregunta creada:', data);
                alert('Pregunta creada exitosamente');
                setPregunta('');
                setRespuesta('');
            } else {
                alert('Error al crear la pregunta');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la conexión');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Pregunta</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la pregunta"
                placeholderTextColor="#B0B0B0"
                value={pregunta}
                onChangeText={setPregunta}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese la respuesta"
                placeholderTextColor="#B0B0B0"
                value={respuesta}
                onChangeText={setRespuesta}
            />
            <Button title="Crear Pregunta" onPress={handleSubmit} color="#4CAF50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#555555',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#2E2E2E',
        color: '#FFFFFF',
    },
});
