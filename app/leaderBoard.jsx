import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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
                       
                        <TouchableOpacity style={styles.scoreContainer}  onPress={() => router.push(`/perfilLeaderboard?id=${item.id}`)}>
                            <Text style={styles.position}>{index + 1}.</Text>
                            <Text style={styles.username}>{item.usuario}</Text>
                            <Text style={styles.maxScore}>{item.max_puntaje}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            )}
             <TouchableOpacity style={styles.button} onPress={() => router.push('/menu')}>
                <Text style={styles.buttonText}>Volver al Menú</Text>
            </TouchableOpacity>
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
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 20,
        fontWeight: 'bold',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
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
        padding: 15,
        marginVertical: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    position: {
        fontSize: 22,
        color: '#FFD700',
        fontWeight: '600',
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '500',
        flex: 1, 
        marginHorizontal: 10,
    },
    maxScore: {
        fontSize: 20,
        color: '#FFD700',
        fontWeight: '600',
        textAlign: 'right',
    },


    button: {
        marginTop: 20,
        backgroundColor: '#FFD700',  // Color dorado
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25, // Borde redondeado
        alignItems: 'center', // Centra el texto
        justifyContent: 'center',
        width: '70%', // Ancho del botón
        marginBottom: 20, // Espacio debajo
        elevation: 5, // Sombra ligera para Android
    },


    buttonText: {
        fontSize: 18,
        color: '#1F1F1F', // Texto oscuro
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center', // Centrado
    },


});
