import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const router = useRouter();
    const [puntajes, setPuntajes] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const obtenerPuntajes = async () => {
            try {
                const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios');
                const data = await response.json();
                
                const puntajesOrdenados = data.sort((a, b) => b.max_puntaje - a.max_puntaje);
                setPuntajes(puntajesOrdenados);
                setLoading(false); 
            } catch (error) {
                console.error('error en el fetch de los puntajes:', error);
                setLoading(false); 
            }
        };

        obtenerPuntajes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabla de Líderes</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
                <FlatList
                    data={puntajes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.scoreContainer}>
                            <Text style={styles.position}>{index + 1}.</Text>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.maxScore}>{item.max_puntaje}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        width: '100%',
    },
    position: {
        fontSize: 20,
        color: '#FFD700',
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        color: '#FFFFFF',
        flex: 1, 
    },
    maxScore: {
        fontSize: 20,
        color: '#FFD700',
        marginLeft: 50,
        marginRight: 10,
    },
});
