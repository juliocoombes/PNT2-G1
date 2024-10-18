import { View, Text, Button, StyleSheet } from 'react-native';

export default function GameScreen() {
    const startGame = () => {
        // Lógica para comenzar el juego
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Juego</Text>
            <Button title="Comenzar Juego" onPress={startGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
});
