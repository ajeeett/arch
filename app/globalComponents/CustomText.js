import React from 'react';
import { Text } from 'react-native';

export default function CustomText(props) {
  return (
    <Text
      numberOfLines={props.lineNumbers}
      ellipsizeMode={props.ellipseMode}
      style={[props.styles]}
      // adjustsFontSizeToFit
      // minimumFontScale={.9}
      onPress={props.handler && props.handler}>
      {props.content}
    </Text>
  );
}
