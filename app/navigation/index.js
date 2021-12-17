import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import NavigationStack from './NavigationStack';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';


export default function Navigation() {

  return <NavigationStack />;
}

const styles = StyleSheet.create({
  activeColor: { backgroundColor: '#707070' },
  inactiveColor: { backgroundColor: '#0000004D' },
  displayNone: { display: 'none' },
});
