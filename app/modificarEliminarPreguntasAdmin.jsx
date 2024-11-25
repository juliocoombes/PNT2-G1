import { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function ListarPreguntasAdmin() {
    const [preguntas, setPreguntas] = useState([]);
    const apiPreguntas = 'https://67184566b910c6a6e02b8291.mockapi.io/preguntas/Preguntas';
    const router = useRouter();
    const { setpreguntaElegida } = useUser();

    useEffect(() => {
        fetchPreguntas();
    }, []);

    const fetchPreguntas = async () => {
        try {
            const response = await fetch(apiPreguntas);
            const data = await response.json();
            setPreguntas(data);
        } catch (error) {
            alert('Error al obtener preguntas');
        }
    };

    const eliminarPregunta = (id) => {
        Alert.alert(
            'Eliminar Pregunta',
            '¿Estás seguro de que deseas eliminar esta pregunta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            await fetch(`${apiPreguntas}/${id}`, { method: 'DELETE' });
                            alert('Pregunta eliminada.');
                            fetchPreguntas();
                        } catch (error) {
                            alert('Error al eliminar la pregunta.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const modificarPregunta = (pregunta) => {
        setpreguntaElegida(pregunta); // aqui se guarda la pregunta en el contexto
        router.push('/formModificarPregunta');
    };

    const irMenu = () => {
        router.push('/menu'); // Navegar a la ruta /menu
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.question}>{item.pregunta}</Text>
            <View style={styles.buttons}>
                <Button title="Modificar" onPress={() => modificarPregunta(item)} />
                <Button title="Eliminar" color="red" onPress={() => eliminarPregunta(item.id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={preguntas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>No hay preguntas disponibles.</Text>}
            />
            <Button title="Ir al Menú" onPress={irMenu} style={styles.menuButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40, 
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    item: {
        backgroundColor: '#333',
        padding: 15,
        marginBottom: 20, 
        borderRadius: 10,
        width: '100%',
    },
    question: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    empty: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    menuButton: {
        marginTop: 30, 
        width: '100%',
    },
});
