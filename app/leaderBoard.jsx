import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function LeaderboardScreen() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            // Recupera los datos de la API
            const response = await fetch('https://api.example.com/leaderboard'); //Crear una api para esto
            const data = await response.json();
            setLeaderboard(data);
        };
        fetchLeaderboard();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabla de Líderes</Text>
            <FlatList
                data={leaderboard}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.username}: {item.score}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
