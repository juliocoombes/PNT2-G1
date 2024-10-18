import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CrearPreguntas() {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const handleSubmit = async () => {
        // Lógica para enviar la pregunta a la API o base de datos
        console.log('Pregunta:', question);
        console.log('Respuesta:', answer);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Pregunta</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la pregunta"
                value={question}
                onChangeText={setQuestion}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese la respuesta"
                value={answer}
                onChangeText={setAnswer}
            />
            <Button title="Crear Pregunta" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    input: { height: 40, borderColor: 'grey', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
});
