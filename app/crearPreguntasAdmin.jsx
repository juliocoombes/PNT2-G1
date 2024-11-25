import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function CrearPreguntasAdmin() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [respuesta4, setRespuesta4] = useState('');
    const [correcta, setCorrecta] = useState('');
    const router = useRouter();
    const { setpreguntaElegida } = useUser();

    const apiCrearPregunta = 'https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas';

    const crearPregunta = async () => {
        if (pregunta && respuesta1 && respuesta2 && respuesta3 && respuesta4) {
            const nuevaPregunta = {
                pregunta,
                respuestas: [
                    { id_opcion: 1, opcion: respuesta1, es_correcta: correcta === '1' },
                    { id_opcion: 2, opcion: respuesta2, es_correcta: correcta === '2' },
                    { id_opcion: 3, opcion: respuesta3, es_correcta: correcta === '3' },
                    { id_opcion: 4, opcion: respuesta4, es_correcta: correcta === '4' },
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
                    Alert.alert(
                        'Pregunta creada exitosamente',
                        '¿Qué te gustaría hacer ahora?',
                        [
                            {
                                text: 'Crear otra pregunta',
                                onPress: () => {
                                    setPregunta('');
                                    setRespuesta1('');
                                    setRespuesta2('');
                                    setRespuesta3('');
                                    setRespuesta4('');
                                    setCorrecta('');
                                },
                            },
                            {
                                text: 'Ir al Menú Principal',
                                onPress: () => {
                                    setpreguntaElegida(null);
                                    router.push('/menu');
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                alert('No se pudo crear la pregunta, intenta nuevamente.');
            }
        } else {
            alert('Todos los campos son obligatorios.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text style={styles.title}>Crear Nueva Pregunta</Text>

                <Text style={styles.label}>Pregunta:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe la pregunta"
                    placeholderTextColor="#888888"
                    value={pregunta}
                    onChangeText={setPregunta}
                />

                <Text style={styles.label}>Respuesta 1:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Respuesta 1"
                    placeholderTextColor="#888888"
                    value={respuesta1}
                    onChangeText={setRespuesta1}
                />

                <Text style={styles.label}>Respuesta 2:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Respuesta 2"
                    placeholderTextColor="#888888"
                    value={respuesta2}
                    onChangeText={setRespuesta2}
                />

                <Text style={styles.label}>Respuesta 3:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Respuesta 3"
                    placeholderTextColor="#888888"
                    value={respuesta3}
                    onChangeText={setRespuesta3}
                />

                <Text style={styles.label}>Respuesta 4:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Respuesta 4"
                    placeholderTextColor="#888888"
                    value={respuesta4}
                    onChangeText={setRespuesta4}
                />

                <Text style={styles.label}>Respuesta Correcta (1-4):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Indique si es: 1, 2, 3 o 4"
                    placeholderTextColor="#888888"
                    keyboardType="numeric"
                    value={String(correcta)}
                    onChangeText={(text) => {
                        if (text === '' || ['1', '2', '3', '4'].includes(text)) {
                            setCorrecta(text);
                        } else {
                            alert('Acción inválida, solo se pueden elegir entre 1 y 4.');
                        }
                    }}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Crear Pregunta" onPress={crearPregunta} />
                    <Button title="Modificar preguntas" onPress={() => router.push('/modificarEliminarPreguntasAdmin')} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    input: {
        height: 50,
        borderColor: 'white',
        borderWidth: 1.5,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 8,
    },
    buttonContainer: {
        marginTop: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
