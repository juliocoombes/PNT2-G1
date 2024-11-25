import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function ModificarPreguntaAdmin() {
    const router = useRouter();
    const { preguntaElegida, setpreguntaElegida } = useUser();
    const [pregunta, setPregunta] = useState('');
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [respuesta4, setRespuesta4] = useState('');
    const [correcta, setCorrecta] = useState('');
    const apiPreguntas = `https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas`;

    useEffect(() => {
        if (preguntaElegida) {
            cargarPregunta(preguntaElegida);
        } else {
            // alert('No se seleccioon ninguna pregunta.');
            router.push('/modificarEliminarPreguntasAdmin');
        }
    }, [preguntaElegida]);

    const cargarPregunta = (data) => {
        setPregunta(data.pregunta);
        setRespuesta1(data.respuestas[0]?.opcion || '');
        setRespuesta2(data.respuestas[1]?.opcion || '');
        setRespuesta3(data.respuestas[2]?.opcion || '');
        setRespuesta4(data.respuestas[3]?.opcion || '');
        const correctaIndex = data.respuestas.findIndex((res) => res.es_correcta);
        setCorrecta((correctaIndex + 1).toString());
    };

    const actualizarPregunta = async () => {
        if (!pregunta || !respuesta1 || !respuesta2 || !respuesta3 || !respuesta4 || !correcta) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const preguntaActualizada = {
            pregunta,
            respuestas: [
                { id_opcion: 1, opcion: respuesta1, es_correcta: correcta === '1' },
                { id_opcion: 2, opcion: respuesta2, es_correcta: correcta === '2' },
                { id_opcion: 3, opcion: respuesta3, es_correcta: correcta === '3' },
                { id_opcion: 4, opcion: respuesta4, es_correcta: correcta === '4' },
            ],
        };

        try {
            const response = await fetch(`${apiPreguntas}/${preguntaElegida.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preguntaActualizada),
            });

            if (response.ok) {
                alert('Pregunta actualizada exitosamente.');
                setpreguntaElegida(null); // Limpiar el contexto
                router.push('/modificarEliminarPreguntasAdmin');
            } else {
                alert('Error al actualizar la pregunta.');
            }
        } catch (error) {
            alert('No se pudo actualizar la pregunta.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modificar Pregunta</Text>
            <TextInput
                style={styles.input}
                placeholder="Pregunta"
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
            <Text style={styles.title}>Posición de la respuesta correcta:</Text>
            <TextInput
                style={styles.input}
                placeholder="Respuesta Correcta (1-4)"
                keyboardType="numeric"
                value={correcta}
                onChangeText={(text) => {
                    if (['1', '2', '3', '4'].includes(text)) {
                        setCorrecta(text);
                    } else {
                        alert('Solo puedes elegir un número entre 1 y 4.');
                    }
                }}
            />
            <Button title="Actualizar Pregunta" onPress={actualizarPregunta} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
});
