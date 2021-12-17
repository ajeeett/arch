import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';

export default function RoundButtonDisabled(props) {
  return (
    <TouchableOpacity
      style={props.btnStyle}
      activeOpacity={0.6}
      onPress={() => {
        // Keyboard.dismiss();
        // props.handler ? props.handler() : {};
      }}
      disabled={props.disabled || false}>

      <View style={styles.textView}>
        <Text style={props.btnText}>{props.title}</Text>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
