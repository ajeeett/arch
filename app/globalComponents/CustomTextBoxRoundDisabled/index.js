import React from 'react';
import {
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { colors } from '../../utils/config/colors';
import VectorIcon from '../VectorIcon';
import styles from './style';

export default function CustomTextBoxRoundDisabled(props) {

  return (
    <Pressable onPress={() => props.onPress()} style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <View style={styles.SectionStyle}>
        <TextInput
          style={[
            styles.textInputStyle,
            props.textInputStyle,
          ]}
          // selectionColor="#000"
          key={props.id}
          placeholder={props.placeholder}
          placeholderTextColor={colors.darkGray}
          value={props.value}
          editable={false}
        />

        {props.iconGrpName && props.iconName && (
          <VectorIcon
            groupName={props.iconGrpName}
            name={props.iconName}
            size={props.iconSize ? props.iconSize : 20}
            color={props.iconColor ? props.iconColor : 'rgba(0,0,0,0.5)'}
            style={[styles.ImageStyle, props.iconStyle]}
          />
        )}
      </View>
    </Pressable>
  );
}
