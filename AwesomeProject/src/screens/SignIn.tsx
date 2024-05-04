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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = () => {
  const [mobile, setMobile] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigation = useNavigation();
  const handlePress = () => {
    const userLogin = {
      action: 'login',
      mobile: mobile,
      password: password,
    };
    console.log(userLogin);
    axios
      .post(
        'https://prescription.mpselfhelp.in/php-api/doctors/read.php',
        userLogin,
      )
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          Alert.alert('User Logged In successfully');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedin', JSON.stringify(true));
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Invalid Credentials');
        }
      })
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.status === 401) {
            Alert.alert('Unauthorized: Invalid Credentials');
          } else {
            Alert.alert('Server Error: Please try again later');
          }
        } else if (err.request) {
          // The request was made but no response was received
          Alert.alert('Network Error: Please check your internet connection');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
          Alert.alert('Error: Please try again later');
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      // className="flex-1 items-center"
      contentContainerStyle={styles.container}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
      <Image
        source={require('../assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          // transform: [{translateY: -100}],
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
          source={require('../assets/signinImg.png')}
          style={styles.image}
        />
      </View>

      <View style={{marginVertical: 30}}>
        <TextInput
          keyboardType="numeric"
          style={{
            width: 320,
            backgroundColor: 'white',
            letterSpacing: 2,
            color: 'black',
          }}
          placeholder="Enter your Mobile no"
          placeholderTextColor={'gray'}
          maxLength={10}
          onChange={e => setMobile(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />
        <TextInput
          secureTextEntry={true}
          style={{
            width: 320,
            backgroundColor: 'white',
            letterSpacing: 2,
            color: 'black',
          }}
          placeholder="Enter password"
          placeholderTextColor={'gray'}
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
    </KeyboardAwareScrollView>
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
  container: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    backgroundColor: '#F6F6F6',
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
