import { StyleSheet, View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

export default function Login() {

  //Aca se maneja el login, registro de usuarios, de preguntas etc etc.. junto con la logica correspondiente.
  //Seria como el home de la app por que es lo primero que se ve cuando se corre.

  const [esLogin, setEsLogin] = useState(true)
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    console.log('Usuario: ', usuario);
    console.log('Password: ', password);
    try {
      const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios');
      const data = await response.json();

      const user = data.find(u => (u.username == usuario || u.email == usuario) && u.password == password);

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

  const handleRegister = async () => {
    console.log('Usuario: ', usuario);
    console.log('Password: ', password);
    try {
      const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios'); //api propia de mockapi. la misma en las otras peticiones.
      const data = await response.json()

      const userExist = data.some(u => u.username === usuario);
      const emailExist = data.some(u => u.email === email);

      if (userExist) {
        Alert.alert('El username ya está en uso.')
      }
      else if (emailExist) {
        Alert.alert('El Email ya está registrado.')
      }
      else {
        const body = JSON.stringify({
          username: usuario,
          email: email,
          password: password
        })

        const response = await fetch('https://6718400fb910c6a6e02b761e.mockapi.io/usuarios/Usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        });

        if (response.ok) {
          Alert.alert('Registro Exitoso')
          const nuevoUsuario = response.json()
          router.push('/(tabs)') // Redirige a la pantalla principal.
        } else {
          Alert.alert('Error al registrar el usuario')
        }
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error en la autenticacion')
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esLogin ? 'Login' : 'Register'}</Text>
      <Text>Usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su Usuario'
        value={usuario}
        onChangeText={setUsuario}
      />
      {
        !esLogin && (
          <>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder='Ingrese su Email'
              value={email}
              onChangeText={setEmail}
            />
          </>
        )
      }
      <Text>Password:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder='Ingrese su password'
        value={password}
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
      <View>
        <Text>{esLogin ? "Cambia a Registro" : 'Cambia a Login'}</Text>
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
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  }
});