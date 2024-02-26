import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// type Props = {};
const Home = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
      <Image
        source={require('./assets/startScrenImg.png')}
        style={styles.image}
      />
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
  },
});
