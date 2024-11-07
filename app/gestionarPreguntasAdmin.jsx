// app/CrearPreguntasAdmin.jsx
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function CrearPreguntasAdmin() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [respuesta4, setRespuesta4] = useState('');
    const [correcta, setCorrecta] = useState(""); // aqui guardo el "true" de la respuesta correcta

    const apiCrearPregunta = 'https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas';

    const crearPregunta = async () => {
        if (pregunta && respuesta1 && respuesta2 && respuesta3 && respuesta4) {
            const nuevaPregunta = {
                pregunta,
                respuestas: [
                    { id_opcion: 1, opcion: respuesta1, es_correcta: correcta === 1 },
                    { id_opcion: 2, opcion: respuesta2, es_correcta: correcta === 2 },
                    { id_opcion: 3, opcion: respuesta3, es_correcta: correcta === 3 },
                    { id_opcion: 4, opcion: respuesta4, es_correcta: correcta === 4 },
                ],
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
                    alert('Error al crear la pregunta.');
                } else {
                    // si se creó la pregunta se ponen en "" los campos
                    alert('Pregunta creada exitosamente');
                    setPregunta('');
                    setRespuesta1('');
                    setRespuesta2('');
                    setRespuesta3('');
                    setRespuesta4('');
                    setCorrecta(null);
                   
                }
            } catch (error) {
                // Alert.alert('Error', 'No se pudo crear la pregunta. Intenta de nuevo.');
                alert('No se pudo crear la pregunta, intenta nuevamente.');
            }
        } else {
            alert('Error, se debe completar todos los campos.');
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
                placeholder="Respuesta 1"
                value={respuesta1}
                onChangeText={setRespuesta1}
            />
            <TextInput
                style={styles.input}
                placeholder="Respuesta 2"
                value={respuesta2}
                onChangeText={setRespuesta2}
            />
            <TextInput
                style={styles.input}
                placeholder="Respuesta 3"
                value={respuesta3}
                onChangeText={setRespuesta3}
            />
            <TextInput
                style={styles.input}
                placeholder="Respuesta 4"
                value={respuesta4}
                onChangeText={setRespuesta4}
            />
            <TextInput
                style={styles.input}
                placeholder="Setear 1, 2, 3 o 4 para indicar cual es la respuesta correcta."
                keyboardType="numeric"
                value={String(correcta)}
                onChangeText={(text) => {
                    const num = Number(text);
                    // if para restringir que sea solo 1, 2, 3 o 4
                    if (num >= 1 && num <= 4) {
                        setCorrecta(num);
                    } else if (text === '') {
                        setCorrecta(''); // para que se pueda borrar, si no tira error
                    } else {
                        alert('Acción invalida, solo se pueden elegir entre 1 y 4.');
                    }
                }}
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
        backgroundColor: '#2C2C2C',
        padding: 20
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#EAEAEA',
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#444444',
        color: '#EAEAEA',
    },
});
