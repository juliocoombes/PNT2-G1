import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="juego" options={{ headerShown: false }} />
            <Stack.Screen name="crear preguntas" options={{ headerShown: false }} />
            <Stack.Screen name="tabla de puntos" options={{ headerShown: false }} />
        </Stack>
    )
}
