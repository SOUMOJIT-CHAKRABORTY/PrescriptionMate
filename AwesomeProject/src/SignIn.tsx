import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
const SignIn = (props: Props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    Alert.alert('Button pressed', 'You did it!');
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl text-black font-medium -translate-y-20">
        Welcome Back!
      </Text>
      <Image
        source={require('./assets/signinImg.png')}
        style={styles.image}
        className="-translate-y-10"
      />
      <View className="mt-0 -translate-y-10">
        <TextInput
          placeholder="Enter your Mobile no"
          className="w-full border border-black mt-10 rounded-full px-4 py-2"
        />
        <TextInput
          placeholder="Enter password"
          className="w-full border border-black mt-10 rounded-full px-4 py-2"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text className="py-2" style={styles.buttonText}>
            Sign in
          </Text>
        </TouchableOpacity>
        <Text className="mt-5 font-medium">
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Create One</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 100, // Adjust bottom spacing as needed
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: 140, // Adjust width as needed
    height: 140, // Adjust height as needed
    resizeMode: 'contain', // Adjust resizeMode as needed
    // paddingBottom: 20, // Adjust padding as needed
    // transform: [{translateY: -60}],
  },
});
