import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

 //ahora si funciona el cerrar sesion. Como estaba con el handlelogut no funciona y se crashea.

export default function Menu() {
    const router = useRouter();
    const { user, logout } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {user?.username}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={(user) => router.push('/juego')}>
                    <Icon name="play" size={25} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Jugar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil')}>
                    <Icon name="user-circle" size={25} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/leaderBoard')}>
                    <Icon name="trophy" size={25} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Tabla de líderes</Text>
                </TouchableOpacity>
            </View>

            {user?.user_categoria === "admin" && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/crearPreguntasAdmin')}>
                    <Icon name="server" size={25} color="white" style={styles.icon} />
                        <Text style={styles.adminButtonText}>Gestionar preguntas</Text>
                    </TouchableOpacity>
                </View>
            )}


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/')}>  
                    <Icon name="sign-out" size={25} color="white" style={styles.icon} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2C',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#46A3FF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    adminButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    adminButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
});
