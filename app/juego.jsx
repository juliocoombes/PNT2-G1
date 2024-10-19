// app/GameScreen.jsx
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function GameScreen() {
    const router = useRouter();
    const [preguntas, setPreguntas] = useState([]);
    const [puntos, setPuntos] = useState(0);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [respuestaUsuario, setRespuestaUsuario] = useState('');
    const [juegoComenzado, setJuegoComenzado] = useState(false);

    const apiPreguntas = 'https://6705358c031fd46a830f15c0.mockapi.io/api/v1/Preguntas';

    useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const response = await fetch(apiPreguntas);
                if (!response.ok) {
                    throw new Error('Error al obtener preguntas');
                }
                const data = await response.json();
                setPreguntas(data);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar las preguntas');
            }
        };

        obtenerPreguntas();
    }, []);

    const comenzarJuego = () => {
        if (preguntas.length > 0) {
            setJuegoComenzado(true);
            setRespuestaUsuario('');
            setPuntos(0);
            setIndicePregunta(0);
        } else {
            Alert.alert('Cargando', 'Espere mientras se cargan las preguntas');
        }
    };

    const responderPregunta = () => {
        const preguntaActual = preguntas[indicePregunta];

        if (!preguntaActual) {
            Alert.alert('Error', 'No hay más preguntas');
            return;
        }

        if (respuestaUsuario.trim().toLowerCase() === preguntaActual.respuesta.toLowerCase()) {
            setPuntos(puntos + 1);
            Alert.alert('Correcto', '¡Has respondido correctamente!');
        } else {
            Alert.alert('Incorrecto', 'La respuesta correcta era: ' + preguntaActual.respuesta);
        }

        const siguienteIndice = indicePregunta + 1;

        if (siguienteIndice < preguntas.length) {
            setIndicePregunta(siguienteIndice);
            setRespuestaUsuario('');
        } else {
            // Fin del juego
            Alert.alert('Fin del juego', `Has terminado el juego con ${puntos + 1} puntos!`, [
                {
                    text: 'Ver Tabla de Líderes',
                    onPress: () => {
                        console.log("Navegando a la tabla de líderes");
                        // Navegación a la tabla de líderes
                        router.push('/leaderboard?puntaje=' + (puntos + 1)); // Asegúrate de que la ruta sea correcta
                    },
                },
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Juego</Text>
            <Text style={styles.puntos}>Puntos: {puntos}</Text>
            {!juegoComenzado ? (
                <Button title="Comenzar Juego" onPress={comenzarJuego} />
            ) : (
                <View style={styles.juegoContainer}>
                    <Text style={styles.pregunta}>
                        {preguntas[indicePregunta]?.pregunta}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe tu respuesta"
                        value={respuestaUsuario}
                        onChangeText={setRespuestaUsuario}
                    />
                    <Button title="Responder" onPress={responderPregunta} />
                </View>
            )}
            {preguntas.length === 0 && <Text style={styles.loading}>Cargando preguntas...</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    title: { fontSize: 24, marginBottom: 20, color: '#FFFFFF' },
    puntos: { fontSize: 18, marginBottom: 20, color: '#FFFFFF' },
    juegoContainer: { alignItems: 'center' },
    pregunta: { fontSize: 18, marginBottom: 20, color: '#FFFFFF' },
    input: {
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    loading: { fontSize: 16, color: '#B0B0B0' },
});
