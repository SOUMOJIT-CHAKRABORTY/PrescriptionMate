// import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import PlusIcon from 'react-native-vector-icons/Entypo';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import ModalView from '../components/ModalView';
import ModalList from '../components/ModalList';
import axios from 'axios';
import {Link, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';

// type DiagonosisProps = NativeStackScreenProps<'Diagonosis'>;

export type Medicine = {
  name: string;
  tablets: string;
  times: string;
  days: string;
};

const Diagonosis = ({route}) => {
  const [generalInstruction, setGeneralInstruction] = useState<String>();
  const [foodHabits, setFoodHabits] = useState<String>();
  const [advInstructions, setAdvInstructions] = useState<String>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewable, setViewable] = useState<boolean>(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const {patientDetils} = route.params;
  const navigation = useNavigation();

  const handleOnPress = () => {
    const diagnosisData = {
      action: 'process_prescription',
      patientDetails: {
        patientName: patientDetils.patientName,
        patientAge: patientDetils.patientAge,
        patientGender: patientDetils.patientGender,
      },
      generalInstruction,
      foodHabits,
      advInstructions,
      medicines,
      findings: patientDetils.findings,
      miscellaneous: patientDetils.miscellaneous,
      uploadDoc: patientDetils.uploadDoc,
      docId: patientDetils.docId,
      // tablets,
      // times,
      // days,
    };

    // const diagnosisData = {
    //   action: 'process_prescription',
    //   patientDetails: {
    //     patientName: 'jojhgka ghgh',
    //     patientAge: '33',
    //     patientGender: 'male',
    //   },
    //   generalInstruction: 'kjklaghkla hgahd a gakhal gklga gahkl',
    //   foodHabits: 'aklfja ahga lgakg alhklahglkahg',
    //   advInstructions: 'fahhflhalhfhahshfka ka hh hfhjk hjk',
    //   medicines: [
    //     {
    //       name: 'paracetamol',
    //       tablets: '1',
    //       times: '2',
    //       days: '3',
    //     },
    //   ],
    //   findings: 'fjionfnkab hghkgfgkh hgkhdkh gh',
    //   miscellaneous: 'fhkalhfhkla fafkfljaklfahk',
    //   uploadDoc: null,
    // };

    console.log('Req Data:', diagnosisData);
    axios
      .post(
        'https://prescription.mpselfhelp.in/php-api/patients/read.php',
        diagnosisData,
      )
      .then(res => {
        console.log(res.data);
        if (res.data && res.data.generatedFileName) {
          const {generatedFileName} = res.data;
          const downloadUrl = `http://prescription.mpselfhelp.in/php-api/documents/${generatedFileName}`;

          Linking.openURL(downloadUrl);
        } else {
          Alert.alert('Error:', 'Failed to generate prescription');
        }
        Alert.alert('Success:', 'Details added successfully');
        navigation.navigate('Dashboard');
      })
      .catch(err => {
        console.log(err);
      });
    // fetch('http://192.168.0.144/php-api/patients/read.php', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(diagnosisData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };
  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: '#F6F6F6'}}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
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
            source={require('../assets/prescImg.png')}
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
              color: 'black',
            }}
            onChange={e => setGeneralInstruction(e.nativeEvent.text)}
            placeholder="Max 150 chars"
            placeholderTextColor={'gray'}
            className="w-full mt-4 rounded-full px-4 py-3"
          />
          <Text
            style={{
              marginTop: 15,
              // marginHorizontal: 20,
              marginBottom: 0,
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: '#000000',
            }}>
            Drug Instructions
          </Text>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}> */}
          <EyeIcon
            name="eye"
            size={36}
            color={'#50C2C9'}
            onPress={() => setViewable(true)}
            style={{position: 'absolute', right: 55, top: 130}}
          />

          <PlusIcon
            name="circle-with-plus"
            size={32}
            color={'#50C2C9'}
            onPress={() => setModalVisible(true)}
            style={{position: 'absolute', right: 15, top: 132}}
          />

          <ModalView
            visible={modalVisible}
            setVisible={setModalVisible}
            setMedicines={setMedicines}
            medicines={medicines}
          />
          <ModalList
            visible={viewable}
            setVisible={setViewable}
            medicines={medicines}
          />
          {/* <TextInput
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
            /> */}
          {/* </View> */}
          <TextInput
            style={{
              width: 320,
              backgroundColor: 'white',
              letterSpacing: 2,
              color: 'black',
            }}
            placeholder="Food Habits"
            placeholderTextColor={'gray'}
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
              color: 'black',
            }}
            placeholder="Advance Instructions"
            placeholderTextColor={'gray'}
            onChange={e => setAdvInstructions(e.nativeEvent.text)}
            className="w-full mt-8 rounded-3xl px-4 py-3"
          />
        </View>
        {/* <Link to="/Prescription" style={{marginTop: 20}}>
          <Text style={styles.link}>Edit Details</Text>
        </Link> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text className="py-2" style={styles.buttonText}>
              Export
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Diagonosis;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 35,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999, // Ensure it's above other elements
  },
});
