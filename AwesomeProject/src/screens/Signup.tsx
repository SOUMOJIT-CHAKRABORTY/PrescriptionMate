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
// type Props = {};
const Signup = () => {
  const [name, setName] = useState<String>('');
  const [designation, setDesignation] = useState<String>('');
  const [mobile, setMobile] = useState<String>();
  const [password, setPassword] = useState<String>('');
  const navigation = useNavigation();
  const handlePress = () => {
    const userRegister = {
      name: name,
      phone: mobile,
      designation: designation,
      password: password,
    };
    console.log(userRegister);
    axios
      .post('http://192.168.129.117:3000/users/create-user', userRegister)
      .then(res => {
        console.log(res.data);
        if (res.data.message === 'User created') {
          Alert.alert('User created successfully');
          navigation.navigate('SignIn');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View
      className="flex-1 items-center"
      style={{width: '100%', marginTop: 100, backgroundColor: '#F6F6F6'}}>
      <Image
        source={require('../assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: [{translateY: -100}],
        }}
      />
      <Text
        style={{letterSpacing: 2}}
        className="text-3xl text-black font-medium">
        Welcome Onboard!
      </Text>
      <Text
        style={{letterSpacing: 1}}
        className="mt-6 text-gray-500 font-medium">
        Let’s help your patients, by checkup
      </Text>
      <View style={{marginVertical: 30}}>
        <TextInput
          style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
          placeholder="Enter your full name"
          onChange={e => setName(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />
        <TextInput
          keyboardType="numeric"
          style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
          placeholder="Enter your Mobile no"
          maxLength={10}
          onChange={e => setMobile(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />
        <TextInput
          style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
          placeholder="Enter designation"
          onChange={e => setDesignation(e.nativeEvent.text)}
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
            Register
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
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => console.log('Sign in pressed')}>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignIn')}
              className="font-bold">
              Sign in
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
    // position: 'absolute',
    // bottom: 50, // Adjust bottom spacing as needed
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
});
