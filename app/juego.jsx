// app/GameScreen.jsx
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function GameScreen() {
    const router = useRouter();
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [respuestaUsuario, setRespuestaUsuario] = useState('');

    const apiPreguntas = 'https://6705358c031fd46a830f15c0.mockapi.io/api/v1/Preguntas';

    useEffect(() => {
        // Fetch questions from API
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(apiPreguntas);
                const data = await response.json();
                setPreguntas(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchPreguntas();
    }, []);

    const responderPregunta = () => {
        if (indicePregunta < preguntas.length) {
            const preguntaActual = preguntas[indicePregunta];

            // Verifica la respuesta del usuario
            if (respuestaUsuario.trim().toLowerCase() === preguntaActual.respuesta.toLowerCase()) {
                setPuntos(prevPuntos => prevPuntos + 1); // Sumar puntos solo si la respuesta es correcta
            }

            setRespuestaUsuario(''); // Reiniciar input
            setIndicePregunta(indicePregunta + 1); // Pasar a la siguiente pregunta

            // Si es la última pregunta, finalizar el juego
            if (indicePregunta === preguntas.length - 1) {
                const finalPuntos = puntos + (respuestaUsuario.trim().toLowerCase() === preguntaActual.respuesta.toLowerCase() ? 1 : 0);
                // Navegar a la pantalla de leaderboard
                router.push(`/leaderBoard?puntaje=${finalPuntos}`);
                
            }
        }
    };

    return (
        <View style={styles.container}>
            {indicePregunta < preguntas.length ? (
                <>
                    <Text style={styles.pregunta}>{preguntas[indicePregunta]?.pregunta}</Text>
                    <Text style={styles.puntos}>Puntos: {puntos}</Text> {/* Mostrar el puntaje actual */}
                    <TextInput
                        style={styles.input}
                        value={respuestaUsuario}
                        onChangeText={setRespuestaUsuario}
                    />
                    <Button title="Responder" onPress={responderPregunta} />
                </>
            ) : (
                <Text style={styles.finalizado}>¡Juego terminado!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    pregunta: { fontSize: 20, color: '#FFFFFF' },
    puntos: { fontSize: 24, color: '#FFFFFF', marginVertical: 20 }, // Estilo para el puntaje
    input: { borderWidth: 1, borderColor: '#FFFFFF', marginVertical: 20, padding: 10, width: '80%', color: '#FFFFFF' },
    finalizado: { fontSize: 24, color: '#FFFFFF' },
});
