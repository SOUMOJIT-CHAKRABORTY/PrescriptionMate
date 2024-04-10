import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
};

const ModalList = ({visible, setVisible, medicines}: Props) => {
  // const [medicines, setMedicines] = useState<Medicine[]>([]);

  const renderMedicines = () => {
    if (medicines.length === 0) {
      return (
        <View style={styles.centeredContainer}>
          <Text>No medicine added</Text>
        </View>
      );
    }

    return medicines.map((medicine, index) => (
      <View key={index} style={styles.medicineItem}>
        <Text>{medicine.name}</Text>
        <Text>Tablets: {medicine.tablets}</Text>
        <Text>Times: {medicine.times}</Text>
        <Text>Days: {medicine.days}</Text>
      </View>
    ));
  };

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

        {/* Display added medicines or "No medicine added" message */}
        <View style={styles.contentContainer}>{renderMedicines()}</View>
      </View>
    </Modal>
  );
};

export default ModalList;

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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
