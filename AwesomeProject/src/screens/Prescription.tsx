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
import DocumentPicker from 'react-native-document-picker';

const Prescription = () => {
  const [patientName, setPatientName] = useState<String>();
  const [patientAge, setPatientAge] = useState<String>();
  const [patientGender, setPatientGender] = useState<String>();
  const [findings, setFindings] = useState<String>();
  const [miscellaneous, setMiscellaneous] = useState<String>();
  const [uploadDoc, setUploadDoc] = useState(null);

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      console.log(doc);
      setUploadDoc(doc);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled', error);
      } else {
        console.log(error);
      }
    }
  };

  const handleOnPress = () => {
    const patientDetils = {
      patientName,
      patientAge,
      patientGender,
      findings,
      miscellaneous,
      uploadDoc,
    };
    console.log(patientDetils);
    navigation.navigate('Diagonosis', {patientDetils});
  };
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <Image
        source={require('../assets/shape.png')}
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
        CREATE PRESCRIPTION
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
            source={require('../assets/prescImg.png')}
            style={{
              width: 180,
              height: 140,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{marginVertical: 15}}>
          <TextInput
            style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
            placeholder="Enter patient name"
            maxLength={25}
            onChange={e => setPatientName(e.nativeEvent.text)}
            className="w-full mt-8 rounded-full px-4 py-3"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              keyboardType="numeric"
              style={{width: 120, backgroundColor: 'white', letterSpacing: 2}}
              placeholder="age"
              maxLength={3}
              onChange={e => setPatientAge(e.nativeEvent.text)}
              className="w-full mt-8 rounded-full px-4 py-3"
            />
            <TextInput
              style={{width: 120, backgroundColor: 'white', letterSpacing: 2}}
              placeholder="sex"
              maxLength={10}
              onChange={e => setPatientGender(e.nativeEvent.text)}
              className="w-full mt-8 rounded-full px-4 py-3"
            />
          </View>
          <TextInput
            style={{width: 320, backgroundColor: 'white', letterSpacing: 2}}
            placeholder="Miscellaneous"
            maxLength={150}
            onChange={e => setMiscellaneous(e.nativeEvent.text)}
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
            onChange={e => setFindings(e.nativeEvent.text)}
            placeholder="Findings"
            className="w-full mt-8 rounded-3xl px-4 py-3"
          />
        </View>
        <TouchableOpacity onPress={selectDoc}>
          <Text
            style={{
              color: '#50C2C9',
              fontWeight: 'bold',
              letterSpacing: 1,
              marginTop: 5,
            }}>
            Upload Files
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text className="py-2" style={styles.buttonText}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Prescription;

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
