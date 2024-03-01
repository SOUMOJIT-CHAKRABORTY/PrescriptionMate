import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import PlusIcon from 'react-native-vector-icons/Entypo';
type Props = {};
const Dashboard = (props: Props) => {
  const [userData, setUserData] = useState();
  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post('http://192.168.129.117:3000/users/getuser', {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <Image
        source={require('./assets/shape.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
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
          source={require('./assets/profilepic.png')}
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
          Welcome, Dr. {userData?.name.split(' ')[0]}
        </Text>
      </View>
      <View style={{marginTop: 40, marginHorizontal: 20}}>
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
                onPress={() => navigation.navigate('Prescription')}>
                <PlusIcon name="circle-with-plus" size={26} color={'#50C2C9'} />
              </TouchableOpacity>
            </View>
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
