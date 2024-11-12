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
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleUpdate = async () => {

    const updatedUser = {
      ...user,
      nombre,
      apellido,
      username,
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
          username: updatedUser.username,
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

  return (
    <View style={styles.view}>
      {user ? (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Nombre"

            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Apellido"

            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username"

            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />


          <Button title="Actualizar" onPress={handleUpdate} />
        </>
      ) : (
        <Text>Cargando datos de usuario...</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

