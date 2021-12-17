import React from 'react';
import { View, Platform, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import CustomText from './../CustomText';
import VectorIcon from './../VectorIcon/index';
import NavigationService from '../../navigation/NavigationService';

export default function Header(props) {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container]}>
        <View style={styles.headerView}>

          {props.hideBack ? null : <VectorIcon
            groupName={props.leftGroupName}
            name={props.leftIcon}
            size={25}
            color="#FFF"
            handler={NavigationService.goBack}
          />}

          <View style={[styles.textContainer]}>
            <CustomText styles={styles.headerText} content={props.headerLabel} />
          </View>
        </View>
        <View style={styles.imgView}>
          <Image resizeMode={'contain'} style={styles.imgFlex} source={require('./../../assets/images/logo.png')} />

          {/* {props.rightIcon && (
          <VectorIcon
            groupName={props.rightGroupName}
            name={props.rightIcon}
            size={25}
            color="#FFF"
            handler={props.rightAction}
            style={{ marginLeft: 20, paddingTop: 10 }}
          />
        )} */}
        </View>
      </View>
      {props.showBottomView && <View style={styles.blueBg} />}
    </View>
  );
}
