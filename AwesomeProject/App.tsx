import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import SignIn from './src/screens/SignIn';
import Dashboard from './src/screens/Dashboard';
import Prescription from './src/screens/Prescription';
import Diagonosis from './src/screens/Diagonosis';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Prescription" component={Prescription} />
        <Stack.Screen name="Diagonosis" component={Diagonosis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
