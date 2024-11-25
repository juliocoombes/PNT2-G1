import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'expo-router';

export default function PerfilLeaderboard() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    console.log("id"+ id);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
          const fetchUser = async () => {
            try {
              const response = await fetch(`https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios/${id}`);
              const data = await response.json();
              setUser(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              setLoading(false);
            }
          };
    
          fetchUser();
        }
      }, [id]);

      return (
        <View style={styles.view}>
          {loading ? (
            <Text style={styles.loadingText}>Cargando datos de usuario...</Text>
          ) : user ? (
            <>
            <Text style={styles.title}>Información De Usuario</Text>
              <View style={styles.field}>
              <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.label}>{user.nombre}</Text>
                
              </View>
              <View style={styles.field}>
              <Text style={styles.label}>Apellido:</Text>
                <Text style={styles.label}>{user.apellido}</Text>
                
              </View>
              <View style={styles.field}>
              <Text style={styles.label}>Nombre de Usuario:</Text>
                <Text style={styles.label}>{user.usuario}</Text>
                
              </View>
              <View style={styles.field}>
              <Text style={styles.label}>Email:</Text>
                <Text style={styles.label}>{user.email}</Text>
                
              </View>
            </>
          ) : (
            <Text style={styles.errorText}>No se encontró el usuario.</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/leaderBoard')}>
                <Text style={styles.buttonText}>Volver al Leaderboard</Text>
            </TouchableOpacity>
        </View>
      );
    }

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    padding: 30,
  },
  field: {
    marginBottom: 20, // Espaciado entre cada campo
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5, // Espaciado entre el label y el input
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  loadingText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
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
title: {
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 20,
        fontWeight: 'bold',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});