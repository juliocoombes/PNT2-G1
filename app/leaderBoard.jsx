// app/Leaderboard.jsx
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';

export default function Leaderboard() {
    const { puntaje } = useSearchParams(); // Asegúrate de que 'puntaje' esté aquí
    console.log("Puntaje recibido:", puntaje); // Verifica que se está recibiendo el puntaje

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabla de Líderes</Text>
            <Text style={styles.puntaje}>Tu puntaje: {puntaje}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    title: { fontSize: 24, marginBottom: 20, color: '#FFFFFF' },
    puntaje: { fontSize: 18, color: '#FFFFFF' },
});
