import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import CustomText from 'app/globalComponents/CustomText';
//import LinearGradient from 'react-native-linear-gradient';
export default function CustomButton(props) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={props.disabled || false}
        style={styles.buttonStyle}
        onPress={() => {
          Keyboard.dismiss();
          props.handler ? props.handler() : {};
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#0760DF', '#0179FA']}
          style={[styles.wrapper, { opacity: props.disabled ? 0.6 : 1 }]}>
          <CustomText styles={styles.buttonText} content={props.title} />
        </LinearGradient>
      </TouchableOpacity>
      {props.isLoginLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 17,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#01154F',
    elevation: 5,
    shadowColor: '#2957A440',
  },
  buttonStyle: {
    borderRadius: 5,
  },
  loading: {
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 1,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
});
