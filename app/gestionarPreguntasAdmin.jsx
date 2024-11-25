import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';

export default function CrearPreguntasAdmin() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [respuesta4, setRespuesta4] = useState('');
    const [correcta, setCorrecta] = useState(""); // aquí guardo el número de la respuesta correcta

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
                    // Si se creó la pregunta se muestran las opciones
                    Alert.alert(
                        'Pregunta creada exitosamente', // Título del alert
                        '¿Qué te gustaría hacer ahora?', // Mensaje del alert
                        [
                            {
                                text: 'Crear otra pregunta',
                                onPress: () => {
                                    // Limpiar campos para crear otra pregunta
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
                                    router.push('/menu');
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                alert('No se pudo crear la pregunta, intenta nuevamente.')
            }
            
    };


    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
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

                <Button title="Crear Pregunta" onPress={crearPregunta} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'black', // Fondo oscuro moderno
    },
  
    input: {
      height: 50,
      borderColor: 'white', // Borde gris oscuro para integrarse bien con el fondo negro
      borderWidth: 1.5, // Borde ligeramente más grueso para resaltar
      marginBottom: 20,
      paddingHorizontal: 15,
      borderRadius: 15, // Bordes redondeados para un diseño moderno
      backgroundColor: 'white', // Fondo del input más claro que el fondo general
      color: 'black', // Texto negro para alto contraste
      fontSize: 16, // Tamaño de texto adecuado para legibilidad
      placeholderTextColor: '#888', // Placeholder gris claro para diferenciarlo del texto
    },
  
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: '#ffffff', // Blanco puro para resaltar
      marginBottom: 20,
      textAlign: 'center',
    },
  
    label: {
      fontSize: 18, // Tamaño más grande para destacar
      fontWeight: '600', // Negrita moderada para resaltar
      color: '#FFF', // Blanco puro para contraste con fondo negro
      marginBottom: 8, // Espacio entre el texto y el input
    },
  
    register: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
  
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
  
    switchText: {
      fontSize: 16,
      color: '#1E90FF', // Azul vibrante para destacar sobre el fondo oscuro
      fontWeight: '600',
      textAlign: 'center',
      marginRight: 10,
    },
  
    button: {
      backgroundColor: '#1E90FF', // Botón azul vibrante
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
  
    buttonText: {
      color: '#ffffff', // Texto blanco para buen contraste
      fontSize: 16,
      fontWeight: '600',
    },
})