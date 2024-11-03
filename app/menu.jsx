import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function Menu() {
    const router = useRouter();
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {user.username}</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Jugar"
                    onPress={() => router.push('/juego')}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Configuraciones"
                    onPress={() => router.push('/configuraciones')}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Estadisticas"
                    onPress={() => router.push('/estadisticas')}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Leaderboard"
                    onPress={() => router.push('/leaderBoard')}
                />
            </View>

            {user.user_categoria === "admin" && (
                <View style={styles.buttonContainer}>
                    <Button
                        title="Crear Preguntas"
                        onPress={() => router.push('/crearPreguntasAdmin')}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 15,
    },
});
