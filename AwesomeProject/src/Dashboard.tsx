import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import PlusIcon from 'react-native-vector-icons/Entypo';
type Props = {};
const Dashboard = (props: Props) => {
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
          Welcome, Dr. Oliva Grace
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
            <ScrollView style={{display: 'flex'}}>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  1. Patient 1
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  2. Patient 2
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  3. Patient 3
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  4. Patient 4
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  5. Patient 5
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  6. Patient 6
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Text
                  style={{fontSize: 16, letterSpacing: 1, color: '#000000'}}>
                  7. Patient 7
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Dashboard;
