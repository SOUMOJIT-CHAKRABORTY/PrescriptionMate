import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/AntDesign';

type Medicine = {
  name: string;
  tablets: string;
  times: string;
  days: string;
};

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  medicines: Medicine[];
  setMedicines: (medicines: Medicine[]) => void;
};

const ModalView = ({visible, setVisible, medicines, setMedicines}: Props) => {
  const [drugName, setDrugName] = useState<string>('');
  const [tablets, setTablets] = useState<string>('');
  const [times, setTimes] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [medicinesList, setMedicinesList] = useState([]);
  const [hide, setHide] = useState(true);

  const fetchMedicines = async () => {
    try {
      const resoponse = await axios.post(
        'https://prescription.mpselfhelp.in/php-api/medicine/read.php',
        {
          search_criteria: drugName,
        },
      );
      setMedicinesList(resoponse.data.data);
      setHide(false);
      console.log(resoponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [drugName]);

  const meddetails = {
    name: drugName,
    tablets: tablets,
    times: times,
    days: days,
  };
  const handleOnPress = () => {
    console.log(drugName);
    setMedicines([...medicines, meddetails]);
    Alert.alert('Medicine Added', 'Medicine has been added successfully');
  };

  const handleSelectMedicine = medicine => {
    setDrugName(medicine.drug_name); // Update input field with selected medicine
    setHide(true);
    setMedicinesList([]); // Clear medicines list
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      //   style={{backgroundColor: '#F6F6F6'}}
      animationType="slide"
      presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Drug Information</Text>

        {/* Close button at top right */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisible(false)}>
          <CloseIcon name="close" size={30} color="#50C2C9" />
        </TouchableOpacity>

        {/* Drug Name input (single line) */}
        <TextInput
          style={{
            width: 320,
            backgroundColor: 'white',
            letterSpacing: 2,
            marginBottom: 20,
            color: 'black',
          }}
          placeholder="Add Drug Name"
          value={drugName}
          placeholderTextColor={'gray'}
          onChange={e => setDrugName(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />

        {!hide && (
          <FlatList
            data={medicinesList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelectMedicine(item)}>
                <Text>{item.drug_name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Container for other inputs (in one line) */}
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.inlineInput]}
            placeholder="Tablets"
            placeholderTextColor={'gray'}
            onChange={e => setTablets(e.nativeEvent.text)}
            className="w-full mt-8 rounded-full px-2 py-3"
          />
          <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.inlineInput]}
            placeholder="Times"
            placeholderTextColor={'gray'}
            onChange={e => setTimes(e.nativeEvent.text)}
            className="w-full mt-8 rounded-full px-2 py-3"
          />
          <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.inlineInput]}
            placeholder="Days"
            placeholderTextColor={'gray'}
            onChange={e => setDays(e.nativeEvent.text)}
            className="w-full mt-8 rounded-full px-2 py-3"
          />
        </View>

        {/* Save button */}
        <TouchableOpacity style={styles.button} onPress={handleOnPress}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              letterSpacing: 1,
              fontSize: 16,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F6F6F6',
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000000',
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 320,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  input: {
    width: '100%',
    backgroundColor: 'white',
    letterSpacing: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  singleLineInput: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inlineInput: {
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },
});
