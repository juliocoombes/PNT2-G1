import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const router = useRouter();
    const [puntaje, setPuntaje] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const obtenerPuntaje = () => {
            console.log('Router Query:', router.query); // Verificar lo que hay en router.query
            if (router.query && router.query.puntaje) {
                setPuntaje(router.query.puntaje); // Asegúrate de que este valor se establece correctamente
                setLoading(false); // Cambia el estado de carga a falso
            } else {
                setLoading(true); // Si no hay puntaje, sigue cargando
            }
        };

        obtenerPuntaje();
    }, [router.query]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabla de Líderes</Text>
            {loading ? (
                <Text style={styles.score}>Cargando puntaje...</Text>
            ) : (
                <Text style={styles.score}>Puntaje: {puntaje}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
    title: { fontSize: 24, color: '#FFFFFF' },
    score: { fontSize: 20, color: '#FFFFFF', marginVertical: 20 },
});
