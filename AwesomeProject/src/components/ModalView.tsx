import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const ModalView = ({visible, setVisible}: Props) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
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
          style={[styles.input, styles.singleLineInput]}
          placeholder="Add Drug Name"
        />

        {/* Container for other inputs (in one line) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inlineInput]}
            placeholder="No. of Tablets"
          />
          <TextInput
            style={[styles.input, styles.inlineInput]}
            placeholder="No. of Times"
          />
          <TextInput
            style={[styles.input, styles.inlineInput]}
            placeholder="No. of Days"
          />
        </View>

        {/* Save button */}
        <Button title="Add" onPress={() => {}} />
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
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
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
