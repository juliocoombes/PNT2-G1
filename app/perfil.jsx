import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'expo-router';

export default function Perfil() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [username, setUsername] = useState(user?.usuario || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleUpdate = async () => {

    const updatedUser = {
      ...user,
      nombre,
      apellido,
      usuario,
      email,
      password
    };

    try {
      const response = await fetch(`https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: updatedUser.nombre,
          apellido: updatedUser.apellido,
          username: updatedUser.usuario,
          email: updatedUser.email,
          password: updatedUser.password
        }),
      });
      if (response.ok) {
        setUser(updatedUser);
        Alert.alert('¡Actualizado!', 'Información de usuario actualizada con éxito.');
        router.push('/menu')
      } else {
        Alert.alert('Error', 'error al actualizar la información.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('¡Eliminado!', 'Tu cuenta ha sido eliminada con éxito.');
        setUser(null); 
        router.push('/'); 
      } else {
        Alert.alert('Error', 'Error al eliminar la cuenta.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  return (
    <View style={styles.view}>
      {user ? (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Apellido:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <Button title="Actualizar" onPress={handleUpdate} />
          <Button style={styles.deleteButton} onPress={() =>
              Alert.alert(
                'Confirmar Eliminación',
                '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Eliminar', onPress: handleDelete, style: 'destructive' },
                ]
              )
              
            }
       title='Eliminar'/>
        </>
      ) : (
        <Text style={styles.loadingText}>Cargando datos de usuario...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/menu')}>
                <Text style={styles.buttonText}>Volver al Menú</Text>
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
  deleteButton: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    color : "red",
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});