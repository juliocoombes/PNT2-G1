import { useRouter } from 'expo-router';

export default function Leaderboard() {
    const router = useRouter();
    const { puntaje } = router.query; // Usa router.query para obtener los parámetros

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabla de Líderes</Text>
            <Text style={styles.score}>Puntaje: {puntaje}</Text>
        </View>
    );
}
