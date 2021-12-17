import React from 'react';
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { colors } from '../../utils/config/colors';
import VectorIcon from '../VectorIcon';
import styles from './style';

export default function CustomTextBoxRound(props) {
  const renderError = id => {
    if (props.errorLabel) {
      return (
        <View style={[styles.errorContainer, props.errorLabelStyle]}>
          <Text style={styles.error}>{props.errorLabel}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.SectionStyle, props.sectionStyle]}>
          <TextInput
            style={[
              styles.textInputStyle,
              props.textInputStyle,
            ]}
            // selectionColor="#000"
            editable={props.editable}
            key={props.id}
            placeholder={props.placeholder}
            placeholderTextColor={colors.darkGray}
            value={props.value}
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry || false}
            onChangeText={e =>
              props.changeTextHandler
                ? props.changeTextHandler(e, props.id)
                : {}
            }
            onBlur={e => props.onBlur && props.onBlur(e, props.id)}

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
      </TouchableWithoutFeedback>
      {renderError()}
    </View>
  );
}
