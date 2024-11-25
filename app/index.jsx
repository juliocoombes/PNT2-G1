import { StyleSheet, View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

// Función auxiliar para validar el formato de email


export default function Login() {

  //Aca se maneja el login, registro de usuarios, de preguntas etc etc.. junto con la logica correspondiente.
  //Seria como el home de la app por que es lo primero que se ve cuando se corre.

  const [esLogin, setEsLogin] = useState(true)
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');

  const { setUser } = useUser();
  const router = useRouter();

//Para validar que no me manden algo que no sea un mail
  const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  //Funciona bien
  const handleLogin = async () => {
    console.log('Usuario: ', usuario);
    console.log('Contraseña: ', contraseña);
    try {
      const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios');
      const data = await response.json();

      const user = data.find(u => (u.usuario == usuario || u.email == usuario) && u.contraseña == contraseña);

      if (user) {
        setUser(user);
        Alert.alert('Login Conseguido');
        router.push('/menu');
      } else {
        Alert.alert('Credenciales incorrectas, por favor intente de nuevo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error en la autenticacion');
    }
  };

  //Funciona bien
  const handleRegister = async () => {
    console.log('Usuario: ', usuario);
    console.log('Contraseña: ', contraseña);
    console.log('Mail: ', email);
  
    try {
      if (usuario && contraseña && email && esEmailValido(email)) {
        const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios');
        const data = await response.json();
        console.log(data);
  
        const userExist = data.some(u => u.username === usuario);
        const emailExist = data.some(u => u.email === email);
  
        if (!userExist && !emailExist) {
          const body = JSON.stringify({
            username: usuario,
            email: email,
            password: contraseña,
          });
  
          const createResponse = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
          });
  
          if (createResponse.ok) {
            Alert.alert('Registro Exitoso');
            const nuevoUsuario = await createResponse.json();
            const loggedUser = {
              id: nuevoUsuario.id,
              username: nuevoUsuario.username,
              email: nuevoUsuario.email,
            };
            setUser(loggedUser);
            router.push('/menu');
          } else {
            Alert.alert('Error al registrar el usuario.');
          }
        } else {
          Alert.alert(userExist ? 'El username ya está en uso.' : 'El Email ya está registrado.');
        }
      } else {
        Alert.alert(
          !usuario || !contraseña || !email
            ? 'Por favor, complete todos los campos.'
            : 'Por favor, ingresa un email válido.'
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error en la autenticación.');
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esLogin ? 'Login' : 'Register'}</Text>
      <Text style={styles.label}>Usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su usuario'
        value={usuario}
        onChangeText={setUsuario}
      />
      {
        !esLogin && (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder='Ingrese su email'
              value={email}
              onChangeText={setEmail}
            />
          </>
        )
      }
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder='Ingrese su contraseña'
        value={contraseña}
        onChangeText={setPassword}
      />
      <View style={styles.register}>
        {
          esLogin ?
            (
              <Button title={'Iniciar Sesion'} onPress={handleLogin} />
            )
            :
            (
              <Button title={'Registrate'} onPress={handleRegister} />
            )
        }
      </View>
      <View style = {styles.switchContainer}>
        <Text style = {styles.switchText}>{esLogin ? "Cambiar a Registro" : 'Cambiar a Login'}</Text>
        <Switch value={esLogin} onValueChange={setEsLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black', // Fondo oscuro moderno
  },

  input: {
    height: 50,
    borderColor: 'white', // Borde gris oscuro para integrarse bien con el fondo negro
    borderWidth: 1.5, // Borde ligeramente más grueso para resaltar
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 15, // Bordes redondeados para un diseño moderno
    backgroundColor: 'white', // Fondo del input más claro que el fondo general
    color: 'black', // Texto blanco para alto contraste
    fontSize: 16, // Tamaño de texto adecuado para legibilidad
    placeholderTextColor: '#888', // Placeholder gris claro para diferenciarlo del texto
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff', // Blanco puro para resaltar
    marginBottom: 20,
    textAlign: 'center',
  },

  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  switchText: {
    fontSize: 16,
    color: '#1E90FF', // Azul vibrante para destacar sobre el fondo oscuro
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 10,
  },

  button: {
    backgroundColor: '#1E90FF', // Botón azul vibrante
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff', // Texto blanco para buen contraste
    fontSize: 16,
    fontWeight: '600',
  },

  label: {
    fontSize: 18, // Tamaño más grande para destacar
    fontWeight: '600', // Negrita moderada para resaltar
    color: '#FFF', // Blanco puro para contraste con fondo negro
    marginBottom: 8, // Espacio entre el texto y el input
  },
});


