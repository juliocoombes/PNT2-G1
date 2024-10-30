// app/GameScreen.jsx
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function GameScreen() {
    const router = useRouter();
    const [preguntas, setPreguntas] = useState([]); //Donde me guardo el array de preguntas
    const [indicePregunta, setIndicePregunta] = useState(0); //Donde me guardo el valor que uso para seguir preugntando, esto al llegar al maximo de preguntas se usa para redirigir al leaderboard
    const [puntos, setPuntos] = useState(0); //Donde me guardo los puntos que voy acumulando, por fdefecto se inicia en 0
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(''); //donde me guardo el flag de la respuesta correcta

    //Me guardo en esta constante el array de todas las preguntas
    const apiPreguntas = 'https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas';

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                //Aqui hago el fectch a la api y espero la respuesta
                const response = await fetch(apiPreguntas);
                const data = await response.json();
                // el metodo random para que no pregunte de forma lineal si no que al azar las preguntas.
                const preguntasAleatorias = data.sort(() => Math.random() - 0.5);
                //y me guardo en el setPreguntas para iterarlo luego
                setPreguntas(preguntasAleatorias);
            } catch (error) {
                console.error('error en el fetch para buscar las preguntas en al api', error);
            }
        };

        //llamo al metodo
        fetchPreguntas();

    }, []);

    const manejarRespuesta = (respuestaSeleccionada) => {
        const preguntaActual = preguntas[indicePregunta];

        // if para verificar si la respuesta es true o false
        if (respuestaSeleccionada.es_correcta) {
            //Si es true sumo un punto
            setPuntos(prevPuntos => prevPuntos + 1);
            setRespuestaCorrecta('Correcto!');
        } else {
            setRespuestaCorrecta('Incorrecto. La respuesta correcta es: ' + preguntaActual.respuestas.find(r => r.es_correcta).opcion);
        }

        // esto para evitar un missclick del usuario.
        if (window.confirm(`${respuestaCorrecta} ¿Desea continuar?`)) {
            //Aqui es donde se hace la iteracion de las preguntas, mientras que hayan preguntas seguirá preguntando
            if (indicePregunta < preguntas.length - 1) {
                //lo manejo con un +1 porque toma la posicion logica, o sea 0, 1, 2 o 3 entonces a todo el resultado tengo que sumarle 1 para mejor visualizacion por parte del usuario.
                setIndicePregunta(indicePregunta + 1);
                setRespuestaCorrecta('');
            } else {
                // si ya no hay mas preguntas lleva a la ventana de leaderboards
                router.push(`/leaderBoard?puntaje=${puntos + (respuestaSeleccionada.es_correcta ? 1 : 0)}`);
            }
        }
    };
    
    

    return (
        <View style={styles.container}>
            {preguntas.length > 0 && indicePregunta < preguntas.length ? (
                <>
                    <Text style={styles.pregunta}>{preguntas[indicePregunta]?.pregunta}</Text>
                    <Text style={styles.puntos}>Puntos: {puntos}</Text>
                    {preguntas[indicePregunta]?.respuestas.map((respuesta) => (
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    pregunta: { fontSize: 20, color: '#FFFFFF' },
    puntos: { fontSize: 24, color: '#FFFFFF', marginVertical: 20 },
    finalizado: { fontSize: 24, color: '#FFFFFF' },
    buttonContainer: { marginBottom: 10, width: '80%' },
});
