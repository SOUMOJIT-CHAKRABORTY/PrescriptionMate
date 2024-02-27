import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// type Props = {};
const Home = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
      <Image
        source={require('./assets/startScrenImg.png')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Adjust resizeMode as needed
    paddingBottom: 20, // Adjust padding as needed
    transform: [{translateY: -60}],
  },
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
  },
});
