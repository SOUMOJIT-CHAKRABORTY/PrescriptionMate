import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
type Props = {};
const Signup = (props: Props) => {
  const [mobile, setMobile] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigation = useNavigation();
  const handlePress = () => {
    const userLogin = {
      phone: mobile,
      password: password,
    };
    console.log(userLogin);
    axios
      .post('http://192.168.129.117:3000/users/login', userLogin)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('User Logged In successfully');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedin', JSON.stringify(true));
          navigation.navigate('Dashboard');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Invalid Credentials');
      });
  };
  return (
    <View
      className="flex-1 items-center"
      style={{width: '100%', marginTop: 100, backgroundColor: '#F6F6F6'}}>
      <Image
        source={require('./assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: [{translateY: -100}],
        }}
      />
      <Text
        style={{letterSpacing: 2, marginBottom: 20}}
        className="text-3xl text-black font-medium">
        Welcome Back!
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: 'black',
          width: 200,
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./assets/signinImg.png')}
          style={styles.image}
        />
      </View>

      <View style={{marginVertical: 30}}>
        <TextInput
          keyboardType="numeric"
          style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
          placeholder="Enter your Mobile no"
          maxLength={10}
          onChange={e => setMobile(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />
        <TextInput
          secureTextEntry={true}
          style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
          placeholder="Enter password"
          onChange={e => setPassword(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text className="py-2" style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 320,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{letterSpacing: 2}}
            className="font-medium text-gray-700">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => console.log('Sign in pressed')}>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Signup')}
              className="font-bold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Signup;
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 320,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
  link: {
    color: '#50C2C9',
    fontSize: 16,
    letterSpacing: 1,
    // textDecorationLine: 'underline',
  },
  image: {
    width: 140, // Adjust width as needed
    height: 140, // Adjust height as needed
    resizeMode: 'contain', // Adjust resizeMode as needed
    // paddingBottom: 20, // Adjust padding as needed
  },
});
