import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';

export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <Stack>
             {/* Pantalla de inicio */}
            <Stack.Screen name="index" options={{ headerShown: false }} /> 

            {/* Pantallas de las pestañas */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Pantallas de juego, crear pregs como admin y tabla de puntuacion */}
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="crear-preguntas" options={{ headerShown: false }} />
            <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
        </Stack>
    )
}