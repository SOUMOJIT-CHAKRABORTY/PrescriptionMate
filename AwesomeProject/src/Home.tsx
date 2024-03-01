import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// type Props = {};
const Home = () => {
  const navigation = useNavigation();
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedin');
    setIsLoggedin(Boolean(data));
  }
  React.useEffect(() => {
    getData();
    if (isLoggedin) {
      navigation.navigate('Dashboard');
    }
  }, []);

  const handlePress = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
      <Image
        source={require('./assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          // transform: [{translateY: -100}],
        }}
      />
      <Image
        source={require('./assets/startScrenImg.png')}
        style={styles.image}
      />
      <View>
        <Text
          style={{letterSpacing: 2}}
          className="text-2xl font-bold text-black">
          Make your prescription here
        </Text>
        <Text
          className="font-md text-gray-500"
          style={{
            marginTop: 18,
            textAlign: 'center',
            fontSize: 17,
            letterSpacing: 1,
          }}>
          Fast and Paperless solution for making Prescriptions
        </Text>
      </View>
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
    backgroundColor: '#F6F6F6',
    // width:
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
    bottom: 80, // Adjust bottom spacing as needed
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: 320,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
