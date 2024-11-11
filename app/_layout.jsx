import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { UserProvider } from './UserContext'; 

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="juego" options={{ headerShown: false }} />
                <Stack.Screen name="menu" options={{ headerShown: false }} />
                <Stack.Screen name="estadisticas" options={{ headerShown: false }} />
                <Stack.Screen name="perfil" options={{ headerShown: false }} />
                <Stack.Screen name="gestionarPreguntasAdmin" options={{ headerShown: false }} />
                <Stack.Screen name="leaderBoard" options={{ headerShown: false }} />
            </Stack>
        </UserProvider>
    );
}
