import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Diagonosis = () => {
  const [generalInstruction, setGeneralInstruction] = useState<String>();
  const [foodHabits, setFoodHabits] = useState<String>();
  const [advInstructions, setAdvInstructions] = useState<String>();
  const [tablets, setTablets] = useState<Number>();
  const [times, setTimes] = useState<Number>();
  const [days, setDays] = useState<Number>();
  const navigation = useNavigation();

  const handleOnPress = () => {
    const diagnosisData = {
      generalInstruction,
      foodHabits,
      advInstructions,
      tablets,
      times,
      days,
    };
    console.log(diagnosisData);
  };
  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <Image
        source={require('./assets/shape.png')}
        style={{position: 'absolute', top: 0, left: 0}}
      />
      <Text
        style={{
          marginTop: 40,
          marginHorizontal: 20,
          fontSize: 24,
          fontWeight: 'bold',
          letterSpacing: 2,
          color: '#000000',
        }}>
        ADD DIAGNOSIS
      </Text>
      <View style={{marginTop: 10, marginHorizontal: 20, alignItems: 'center'}}>
        <View
          style={{
            marginTop: 8,
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'dashed',
            width: 260,
            height: 140,
            alignItems: 'center',
          }}>
          <Image
            source={require('./assets/prescImg.png')}
            style={{
              width: 180,
              height: 140,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              // marginTop: 40,
              // marginHorizontal: 20,
              marginBottom: 0,
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: '#000000',
            }}>
            General Instructions
          </Text>
          <TextInput
            multiline
            maxLength={150}
            style={{
              width: 320,
              height: 70,
              backgroundColor: 'white',
              letterSpacing: 2,
            }}
            onChange={e => setGeneralInstruction(e.nativeEvent.text)}
            placeholder="Max 150 chars"
            className="w-full mt-4 rounded-full px-4 py-3"
          />
          <Text
            style={{
              marginTop: 8,
              // marginHorizontal: 20,
              marginBottom: 0,
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: '#000000',
            }}>
            Drug Instructions
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              keyboardType="numeric"
              style={{width: 100, backgroundColor: 'white', letterSpacing: 2}}
              placeholder="tabs"
              onChange={e => setTablets(+e.nativeEvent.text)}
              className="w-full mt-2 rounded-full px-4 py-3"
            />
            <TextInput
              keyboardType="numeric"
              style={{width: 100, backgroundColor: 'white', letterSpacing: 2}}
              placeholder="times"
              onChange={e => setTimes(+e.nativeEvent.text)}
              className="w-full mt-2 rounded-full px-4 py-3"
            />
            <TextInput
              keyboardType="numeric"
              style={{width: 100, backgroundColor: 'white', letterSpacing: 2}}
              placeholder="days"
              onChange={e => setDays(+e.nativeEvent.text)}
              className="w-full mt-2 rounded-full px-4 py-3"
            />
          </View>
          <TextInput
            style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
            placeholder="Food Habits"
            onChange={e => setFoodHabits(e.nativeEvent.text)}
            className="w-full mt-8 rounded-full px-4 py-3"
          />
          <TextInput
            multiline
            maxLength={150}
            style={{
              width: 320,
              height: 80,
              backgroundColor: 'white',
              letterSpacing: 2,
            }}
            placeholder="Advance Instructions"
            onChange={e => setAdvInstructions(e.nativeEvent.text)}
            className="w-full mt-8 rounded-3xl px-4 py-3"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text className="py-2" style={styles.buttonText}>
              Export
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Diagonosis;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 25,
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
