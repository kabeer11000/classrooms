import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../authScreens/Home';
import Profile from '../authScreens/Profile';
import {globalColors} from '../styles/styles';
import Classroom from '../authScreens/Classroom';
import Material from '../authScreens/Material';
import Assignment from '../authScreens/Assignment';
import CreateClass from '../components/home/CreateClass';
import JoinClass from '../components/home/JoinClass';
import Header from '../containers/Header';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: globalColors.Dark,
        },
        headerTitleStyle: {
          color: globalColors.Light,
        },
        headerTintColor: globalColors.Light,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation}) => (
            <Header navigateToProfile={() => navigation.navigate('Profile')} />
          ),
        }}
      />
      <Stack.Screen name="Create Class" component={CreateClass} />
      <Stack.Screen name="Join Class" component={JoinClass} />
      <Stack.Screen name="Classroom" component={Classroom} />
      <Stack.Screen name="Material" component={Material} />
      <Stack.Screen name="Assignment" component={Assignment} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
