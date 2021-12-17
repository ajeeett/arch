import React, {useState, useEffect} from 'react';
import {get} from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import CustomButton from './../../../globalComponents/CustomButton/index';

export default function Login({navigation}) {
  return (
    <View style={{backgroundColor: '#AE0606', flex: 1}}>
      <Text style={styles.text}>Login</Text>
      <CustomButton
        btnText={styles.exploreText}
        btnStyle={styles.exploreBtn}
        title={'home.explore_courses'}
        handler={() => {}}
        handler={() => navigation.navigate('Search')}
        // isLoginLoading={isLoader ? isLoginLoading : false}
        disabled={true}
      />
    </View>
  );
}
