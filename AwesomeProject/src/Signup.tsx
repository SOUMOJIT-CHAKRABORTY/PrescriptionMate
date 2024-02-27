import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
type Props = {};
const Signup = (props: Props) => {
  const navigation = useNavigation();
  const handlePress = () => {
    Alert.alert('Button pressed', 'You did it!');
  };
  return (
    <View className="flex-1 items-center pt-20">
      <Text className="text-2xl text-black font-medium">Welcome Onboard!</Text>
      <Text className="mt-6 text-gray-500 font-medium">
        Let’s help your patients, by checkup
      </Text>
      <View>
        <TextInput
          placeholder="Enter your full name"
          className="w-full border border-black mt-10 rounded-full px-4 py-2"
        />
        <TextInput
          placeholder="Enter your Mobile no"
          className="w-full border border-black mt-10 rounded-full px-4 py-2"
        />
        <TextInput
          placeholder="Enter designation"
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
            Register
          </Text>
        </TouchableOpacity>
        <Text className="mt-5 font-medium">
          Already have an account?{' '}
          <TouchableOpacity onPress={() => console.log('Sign in pressed')}>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignIn')}>
              Sign in
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
export default Signup;
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
});
