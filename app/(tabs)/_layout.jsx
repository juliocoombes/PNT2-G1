import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'react-native'

export default function TabLayout(){

    const colorScheme = useColorScheme() //hook para detectar el tema del dispositivo (claro/oscuro)

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint 
            }}>
                
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'home' : 'home-outline'} color={color}/>
                    )
                }}
            />


            <Tabs.Screen
            name="leaderBoard"
            options={{
                title: "Tabla de puntos",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons size={28} name={focused ? 'trophy' : 'trophy-outline'} color={color} />
                )
            }}
            />


            <Tabs.Screen
            name="juego"
            options={{
                title: "Juego",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons size={28} name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
                )
            }}
            />

        </Tabs>
    )
}