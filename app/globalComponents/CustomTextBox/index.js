import React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import VectorIcon from '../VectorIcon';
import styles from './style';
export default function CustomTextBox(props) {
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
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.textInputFlex,
              props.textInputStyle,
            ]}
            selectionColor="#000"
            key={props.id}
            label={props.placeholder}
            value={props.value}
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry || false}
            // underlineColor={props.value ? '#EE5636' : '#F2F2F2'}
            onChangeText={e =>
              props.changeTextHandler
                ? props.changeTextHandler(props.id, e)
                : {}
            }
            onBlur={e => props.onBlur && props.onBlur(props.id, e)}
            theme={{
              colors: {
                placeholder: props.value ? '#EE5636' : 'rgba(0, 0, 0, 0.4)',
                primary: '#EE5636',
                // underlineColor: '#EE5636',
              },
            }}
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
