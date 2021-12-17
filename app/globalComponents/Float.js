'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import {
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Text,
  View,
  Platform,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
// import CrossIcon from './../../assets/svg/ic_plus.svg';
// import DownArrow from './../../containers/Onboarding/svg/DownArrow';
import { scaleByHeight, scaleByWidth, width } from './../utils/config/theme';
// import {fontRegular} from '../../config/fonts';
// import {fontBlack} from '../../config/colors';

var textPropTypes = Text.propTypes || ViewPropTypes;
var textInputPropTypes = TextInput.propTypes || textPropTypes;
var propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
};

var FloatingLabel = createReactClass({
  propTypes: propTypes,

  getInitialState() {
    var state = {
      text: this.props.value,
      dirty: this.props.value || this.props.placeholder,
    };

    var style = state.dirty ? dirtyStyle : cleanStyle;
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top),
    };

    return state;
  },

  shouldComponentUpdate(props, state) {
    if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
      this.setState({ text: props.value, dirty: !!props.value });
      this._animate(!!props.value);
    }
    return true;
  },

  _animate(dirty) {
    var nextStyle = dirty ? dirtyStyle : cleanStyle;
    var labelStyle = this.state.labelStyle;
    var anims = Object.keys(nextStyle).map(prop => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: 200,
          useNativeDriver: false,
        },
        Easing.ease,
      );
    });

    Animated.parallel(anims).start();
  },

  _onFocus() {
    this._animate(true);
    this.setState({ dirty: true });
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
  },

  _onBlur() {
    if (!this.state.text) {
      this._animate(false);
      this.setState({ dirty: false });
    }
    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  },

  onChangeText(text) {
    this.setState({ text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  },

  updateText(event) {
    var text = event.nativeEvent.text;
    this.setState({ text });

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  },

  _renderLabel() {
    return (
      <Animated.Text
        ref="label"
        style={[this.state.labelStyle, styles.label, this.props.labelStyle]}>
        {this.props.children}
      </Animated.Text>
    );
  },

  render() {
    var props = {
      autoCapitalize: this.props.autoCapitalize,
      autoCorrect: this.props.autoCorrect,
      autoFocus: this.props.autoFocus,
      bufferDelay: this.props.bufferDelay,
      clearButtonMode: this.props.clearButtonMode,
      clearTextOnFocus: this.props.clearTextOnFocus,
      controlled: this.props.controlled,
      editable: this.props.editable,
      enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
      keyboardType: this.props.keyboardType,
      multiline: this.props.multiline,
      numberOfLines: this.props.numberOfLines,
      onBlur: this._onBlur,
      onChange: this.props.onChange,
      onChangeText: this.onChangeText,
      onEndEditing: this.updateText,
      onFocus: this._onFocus,
      onSubmitEditing: this.props.onSubmitEditing,
      password: this.props.secureTextEntry || this.props.password, // Compatibility
      placeholder: this.props.placeholder,
      secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
      returnKeyType: this.props.returnKeyType,
      selectTextOnFocus: this.props.selectTextOnFocus,
      selectionState: this.props.selectionState,
      style: [
        styles.input,
        this.props.removeHorizontalPadding
          ? { paddingLeft: 0, paddingRight: 0 }
          : {},
      ],
      testID: this.props.testID,
      value: this.state.text,
      underlineColorAndroid: this.props.underlineColorAndroid, // android TextInput will show the default bottom border
      onKeyPress: this.props.onKeyPress,
      showCross: this.props.showCross,
      onIconPress: this.props.onIconPress,
      showDropDown: this.props.showDropDown,
      maxLength: this.props.maxLength,
    },
      elementStyles = [styles.element];

    if (this.props.inputStyle) {
      props.style.push(this.props.inputStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    return (
      <View style={elementStyles}>
        {this._renderLabel()}
        <View
          style={styles.flexContainer}>
          {!props.showDropDown ? (
            <TextInput {...props} autoCompleteType={'off'} />
          ) : (
            <View
              style={[
                styles.viewContainer,
                styles.input,
                props.style,
              ]}>
              <Text
                style={styles.textStyle}>
                {!props.value ? '' : props.value}
              </Text>
            </View>
          )}

          {/* {props.showDropDown ? (
            <DownArrow
              width={scaleByWidth(10)}
              height={scaleByHeight(10)}
              style={{
                flex: 1,
                position: 'absolute',
                right: scaleByWidth(15),
                bottom: scaleByHeight(18),
              }}
            />
          ) : null} */}
          {props.showCross && props.value.length > 0 && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={props.onIconPress}
              style={styles.toStyle}>
              {/* <CrossIcon width={scaleByHeight(40)} height={scaleByHeight(40)} /> */}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
});

var labelStyleObj = {
  marginTop: scaleByHeight(21),
  paddingLeft: 0,
  color: '#AAA',
  position: 'absolute',
};

if (Platform.OS === 'web') {
  labelStyleObj.pointerEvents = 'none';
}

var styles = StyleSheet.create({
  element: {
    position: 'relative',
  },
  input: {
    height: scaleByHeight(40),
    flex: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'black',
    fontSize: scaleByWidth(20),
    borderRadius: 4,
    marginTop: scaleByHeight(20),
    paddingLeft: scaleByWidth(50),
    paddingRight: scaleByWidth(50),
  },
  label: labelStyleObj,
  toStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flex: 1,
  },
  textStyle: {
    // fontFamily: fontRegular,
    color: '#000',
    textAlign: 'center',
    fontSize: scaleByWidth(16),
  },
  viewContainer: {
    height: scaleByHeight(50),
    width: width * 0.9,
    borderWidth: 1
  },
  flexContainer: {
    flexDirection: 'row',
  }
});

var cleanStyle = {
  fontSize: scaleByWidth(20),
  top: 7,
};

var dirtyStyle = {
  fontSize: scaleByWidth(12),
  top: -17,
};

export default FloatingLabel;
