import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import { colors, fontGrey } from '../../utils/config/colors';
import { fontBold, fontRegular } from '../../utils/config/fonts';
import CustomText from './../CustomText';
const width = Dimensions.get('window').width;
export default function CustomButton(props) {
  return (
    <TouchableOpacity
      style={props.toOpacity ? props.toOpacity : styles.toOpacity}
      activeOpacity={0.6}
      onPress={() => {
        Keyboard.dismiss();
        props.handler ? props.handler() : {};
      }}
      disabled={props.disabled || false}>
      <View style={[props.btnStyle ? props.btnStyle : styles.image, { opacity: props.disabled ? 0.5 : 1 }]}>
        <View style={styles.imageText}>
          <CustomText content={props.title} styles={props.btnText ? props.btnText : styles.buttonText} />
        </View>
      </View>
      {props.isLoginLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
    color: colors.appBlue,
    backgroundColor: 'transparent',
    paddingBottom: 7.5,
  },
  image: {
    width: '100%',
    height: width > 500 ? 50 : 45,
    backgroundColor: colors.buttonYellow,
    borderRadius: width > 500 ? 35 : 30,
  },
  imageText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toOpacity: {
    width: '100%',
    height: 50,
    marginTop: 20
  }
});
