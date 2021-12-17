import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChartIcon from 'react-native-vector-icons/AntDesign';
import { get, isObject, isArray } from 'lodash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useSelector } from 'react-redux';
import { navigationRef } from './NavigationService';
import Login from './../screens/LoginStack/Login';
// import SnackbarContainer from '../components/SnackbarContainer/SnackbarContainer';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  // const StudentTabNavigator = () => {
  //   return (
  //     <Tab.Navigator
  //       initialRouteName="Home"
  //       tabBarOptions={{
  //         indicatorStyle: {
  //           backgroundColor: 'transparent',
  //         },
  //         activeTintColor: '#EE5636',
  //         inactiveTintColor: '#00000080',
  //         style: {
  //           paddingBottom: 10,
  //           paddingTop: 10,
  //           height: 60,
  //         },
  //         showIcon: true,
  //         showLabel: true,
  //       }}>
  //       <Tab.Screen
  //         name="HomeTab"
  //         component={HomeStack}
  //         options={{
  //           tabBarLabel: 'Home',
  //           tabBarIcon: ({ color, size }) => (
  //             <VectorIcon
  //               groupName={'FontAwesome'}
  //               name={'home'}
  //               size={25}
  //               color={color}
  //             />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Digital Liveclass"
  //         component={DigitalLiveClassStack}
  //         options={{
  //           tabBarLabel: 'Live',
  //           tabBarIcon: ({ color, size }) => (
  //             <VectorIcon
  //               groupName={'AntDesign'}
  //               name={'youtube'}
  //               size={22}
  //               color={color}
  //             />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Dashboard"
  //         component={Home}
  //         options={{
  //           tabBarLabel: 'Profile',
  //           tabBarIcon: ({ color, size }) => (
  //             <VectorIcon
  //               groupName={'FontAwesome'}
  //               name={'user'}
  //               size={22}
  //               color={color}
  //             />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Settings"
  //         component={SettingStack}
  //         options={{
  //           tabBarLabel: 'More',
  //           tabBarIcon: ({ color, size }) => (
  //             <VectorIcon
  //               groupName={'MaterialIcons'}
  //               name={'more-horiz'}
  //               size={22}
  //               color={color}
  //             />
  //           ),
  //         }}
  //       />
  //     </Tab.Navigator>
  //   );
  // };

  return (
    <>
      <NavigationContainer ref={navigationRef}>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>

          <Stack.Screen
            name="Login"
            component={Login}
          />
        </Stack.Navigator>

      </NavigationContainer>
      {/* <SnackbarContainer /> */}
    </>
  );
}
