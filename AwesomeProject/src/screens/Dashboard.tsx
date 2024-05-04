import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import PlusIcon from 'react-native-vector-icons/Entypo';
import LogoutIcon from 'react-native-vector-icons/AntDesign';

const Dashboard = () => {
  const [userData, setUserData] = useState();
  // const [patients, setPatients] = useState();
  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.post(
        'https://prescription.mpselfhelp.in/php-api/doctors/read.php',
        {
          action: 'getUser',
          token: token,
        },
      );
      console.log(response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    console.log('userData updated:', userData);
    // Add additional logic here based on userData changes
  }, [userData]);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedin');
    navigation.navigate('SignIn');
  };

  const handleBackButton = () => {
    Alert.alert(
      'Confirm Exit',
      'Are you sure you want to quit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  //   };
  // }, []);

  return (
    <View
      style={
        {
          // backgroundColor: '#F6F6F6'
        }
      }>
      <Image
        source={require('../assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />

      <TouchableOpacity
        style={{
          alignItems: 'center',
          position: 'absolute',
          right: 20,
          top: 20,
          zIndex: 20,
        }}
        onPress={handleLogout}>
        <LogoutIcon name="logout" size={26} color={'#ffffff'} />
      </TouchableOpacity>
      <View
        style={{
          height: 280,
          borderColor: '#50C2C9',
          borderWidth: 1,
          backgroundColor: '#50C2C9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/profilepic.png')}
          style={{transform: [{translateY: 35}]}}
        />
        <Text
          style={{
            transform: [{translateY: 50}],
            fontSize: 24,
            fontWeight: 'bold',
            letterSpacing: 1,
            color: 'white',
          }}>
          Welcome, Dr. {userData?.name?.split(' ')[0]}
        </Text>
      </View>
      <View
        style={{
          marginTop: 40,
          marginHorizontal: 20,
          // backgroundColor: '#f6f6f6',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            letterSpacing: 1,
            color: 'black',
          }}>
          Patients List
        </Text>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <View
            style={{
              backgroundColor: 'white',
              height: 360,
              width: 340,
              borderRadius: 30,
              paddingHorizontal: 20,
              paddingVertical: 25,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  letterSpacing: 1,
                  fontSize: 18,
                  marginBottom: 10,
                }}>
                Patients
              </Text>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('Prescription', {docId: userData.id})
                }>
                <PlusIcon name="circle-with-plus" size={26} color={'#50C2C9'} />
              </TouchableOpacity>
            </View>
            {!userData?.patients && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 1,
                    color: '#000000',
                  }}>
                  No Patients Found
                </Text>
              </View>
            )}
            {userData && userData.patients && userData.patients.length > 0 && (
              <ScrollView style={{display: 'flex'}}>
                {userData.patients.map((patient, index) => (
                  <View
                    key={index}
                    style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        color: '#000000',
                      }}>
                      {index + 1}. {patient.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Dashboard;
