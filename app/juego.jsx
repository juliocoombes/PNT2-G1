import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function GameScreen() {
    const { user, setUser } = useUser();
    const router = useRouter();
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState('');

    const apiPreguntas = 'https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas';

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(apiPreguntas);
                const data = await response.json();
                const preguntasAleatorias = data.sort(() => Math.random() - 0.5);
                setPreguntas(preguntasAleatorias);
            } catch (error) {
                console.error('Error al obtener preguntas:', error);
            }
        };
        fetchPreguntas();
    }, []);

    const actualizarPuntajeMax = async (nuevoMaxPuntaje) => {
        try {
            const response = await fetch(`https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    max_puntaje: nuevoMaxPuntaje,
                }),
            });

            const data = await response.json();
            setUser(data);
            console.log("max_puntaje actualizado correctamente:", data);
        } catch (error) {
            console.error("Error al actualizar max_puntaje:", error);
        }
    };

    const confirmarCancelacion = () => {
        Alert.alert(
            'Cancelar Juego',
            'Se cancelará el juego, ¿desea continuar?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Sí', onPress: () => router.push('/menu') },
            ],
            { cancelable: true }
        );
    };
    const manejarRespuesta = (respuestaSeleccionada) => {
        const preguntaActual = preguntas[indicePregunta];
        const esCorrecta = respuestaSeleccionada.es_correcta;

        const mensajeRespuesta = esCorrecta
            ? 'Correcto!'
            : 'Incorrecto. La respuesta correcta es: ' +
            preguntaActual.respuestas.find((r) => r.es_correcta).opcion;

        Alert.alert(
            mensajeRespuesta,
            '¿Desea continuar?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: () => {
                        if (esCorrecta) {
                            setPuntos((prevPuntos) => prevPuntos + 1);
                        }

                        if (indicePregunta < preguntas.length - 1) {
                            setIndicePregunta(indicePregunta + 1);
                        } else {
                            const puntajeFinal = puntos + (esCorrecta ? 1 : 0);
                            if (puntajeFinal > user.max_puntaje) {
                                actualizarPuntajeMax(puntajeFinal);
                            }
                            router.push(`/leaderBoard`);
                        }

                        setRespuestaCorrecta('');
                    },
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <View style={styles.container}>
            {preguntas.length > 0 && indicePregunta < preguntas.length ? (
                <>
                    <Text style={styles.pregunta}>{preguntas[indicePregunta]?.pregunta}</Text>
                    <Text style={styles.puntos}>Puntos: {puntos}</Text>
                    {preguntas[indicePregunta]?.respuestas
                        .sort(() => Math.random() - 0.5)
                        .map((respuesta) => (
                            <View key={respuesta.id_opcion} style={styles.buttonContainer}>
                                <Button
                                    title={respuesta.opcion}
                                    onPress={() => manejarRespuesta(respuesta)}
                                />
                            </View>
                        ))}
                </>
            ) : (
                <Text style={styles.finalizado}>¡Juego terminado!</Text>
            )}
            <View style={styles.containerMenu}>
                <TouchableOpacity style={styles.botonIrAlMenu} onPress={confirmarCancelacion}>
                    <Icon name="times-circle-o" size={35} color="red" style={styles.icon} />
                    <Text style={styles.menuText}>Cancelar juego</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    pregunta: { fontSize: 20, color: '#FFFFFF' },
    puntos: { fontSize: 24, color: '#FFFFFF', marginVertical: 20 },
    finalizado: { fontSize: 24, color: '#FFFFFF' },
    buttonContainer: { marginBottom: 10, width: '80%' },
    containerMenu: { marginTop: 25, width: '50%' },
    icon: { marginRight: 10 },
    menuText: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
    botonIrAlMenu: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});
