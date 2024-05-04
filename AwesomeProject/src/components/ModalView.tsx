import React, {useState} from 'react';
import {
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

  const meddetails = {
    name: drugName,
    tablets: tablets,
    times: times,
    days: days,
  };
  const handleOnPress = () => {
    console.log(drugName);
    setMedicines([...medicines, meddetails]);
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
          placeholderTextColor={'gray'}
          onChange={e => setDrugName(e.nativeEvent.text)}
          className="w-full mt-8 rounded-full px-4 py-3"
        />

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
