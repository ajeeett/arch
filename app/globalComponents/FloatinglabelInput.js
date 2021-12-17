import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import {fontBlack} from '../../config/colors';
// import {fontRegular} from '../../config/fonts';
import { scaleByHeight, scaleByWidth } from './../utils/config/theme';
import FloatingLabel from './Float';

class FloatinglabelInput extends Component {
  paddingTopFocused = 7.5 + scaleByHeight(4);
  paddingTopBlur = scaleByHeight(5);
  labelSizeBig = scaleByHeight(16);
  labelSizeSmall = scaleByHeight(12);

  constructor(props) {
    super(props);
    this.state = {
      labelSize:
        !props.value || props.value == ''
          ? this.labelSizeBig
          : this.labelSizeSmall,
      labelpaddingTop:
        !props.value || props.value == '' ? 5 : this.paddingTopFocused,
      labelBackGroundColor:
        !props.value || props.value == '' ? 'transparent' : 'white',
      focused: false,
      zIndex: 0,
    };
  }
  _onFocus = () => {
    this.setState({
      labelSize: this.labelSizeSmall,
      labelBackGroundColor: 'white',
      labelpaddingTop: this.paddingTopFocused,
      focused: true,
      zIndex: 500,
    });
  };
  componentDidMount() {
    if (this.props.value == '' || !this.props.value) {
      this.setState({
        labelSize: this.labelSizeBig,
        labelBackGroundColor: 'transparent',
        labelpaddingTop: this.paddingTopBlur,
        zIndex: 0,
      });
    } else {
      this.setState({
        labelSize: this.labelSizeSmall,
        labelBackGroundColor: 'white',
        labelpaddingTop: this.paddingTopFocused,
        zIndex: 500,
      });
    }
  }
  _onBlur = () => {
    if (this.props.value == '') {
      this.setState({
        labelSize: this.labelSizeBig,
        labelBackGroundColor: 'transparent',
        labelpaddingTop: this.paddingTopBlur,
        focused: false,
        zIndex: 0,
      });
    } else {
      this.setState({
        labelSize: this.labelSizeSmall,
        labelBackGroundColor: 'white',
        labelpaddingTop: this.paddingTopFocused,
        focused: false,
        zIndex: 500,
      });
    }
  };
  _onChangeText = value => {
    if (value == '') {
      this.setState({
        labelSize: this.labelSizeBig,
        labelBackGroundColor: 'transparent',
        labelpaddingTop: this.paddingTopBlur,
        zIndex: 0,
      });
    } else {
      if (this.state.labelSize == 16) {
        this.setState({
          labelSize: this.labelSizeSmall,
          labelBackGroundColor: 'white',
          labelpaddingTop: this.paddingTopFocused,
          zIndex: 500,
        });
      }
    }
    if (this.props.onChangeText) this.props.onChangeText(value);
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value != '' && this.state.labelSize == this.labelSizeBig) {
      this.setState({
        labelSize: this.labelSizeSmall,
        labelBackGroundColor: 'white',
        labelpaddingTop: this.paddingTopFocused,
        zIndex: 500,
      });
    }
    if (nextProps.value == '' && this.state.labelSize == this.labelSizeSmall) {
      this.setState({
        labelSize: this.labelSizeBig,
        labelBackGroundColor: 'transparent',
        labelpaddingTop: this.paddingTopBlur,
        zIndex: 0,
      });
    }
    return true;
  }
  render() {
    let props = this.props;
    let labelSize = this.state.labelSize;
    let labelpaddingTop = this.state.labelpaddingTop;
    let labelBackGroundColor = this.state.labelBackGroundColor;
    return (
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={1}
      // style={{backgroundColor: 'red', height: scaleByHeight(60)}}
      >
        <FloatingLabel
          onKeyPress={e => (props.onKeyPress ? props.onKeyPress(e) : null)}
          style={[props.style]}
          labelStyle={[
            styles.inputLabel,
            {
              fontSize: labelSize,
              backgroundColor: labelBackGroundColor,
              paddingTop: labelpaddingTop,
              zIndex: this.state.zIndex,
            },
          ]}
          inputStyle={[
            styles.inputInner,
            {
              fontSize: props.inputFontSize
                ? props.inputFontSize
                : scaleByWidth(16),
            },
            props.inputStyle,
          ]}
          onFocus={() => this._onFocus()}
          onBlur={() => this._onBlur()}
          onChangeText={value => this._onChangeText(value)}
          value={props.value}
          secureTextEntry={props.secure}
          editable={props.disabled ? false : true}
          multiline={props.multiline ? true : false}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          showCross={props.showCross}
          onIconPress={props.onIconPress}
          showDropDown={props.showDropDown}
          removeHorizontalPadding={props.removeHorizontalPadding}
          maxLength={props.maxLength}>
          {props.placeHolder}
        </FloatingLabel>
      </TouchableOpacity>
    );
  }
}
export default FloatinglabelInput;

const styles = StyleSheet.create({
  inputLabel: {
    // fontFamily: fontRegular,
    color: '#c2c2c2',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 3,
    alignItems: 'center',
  },
  inputInner: {
    height: scaleByHeight(50),
    fontSize: scaleByWidth(16),
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#c2c2c2',
    textAlignVertical: 'center',
    // fontFamily: fontRegular,
    color: '#000',
    textAlign: 'center',
    paddingVertical: 0,
    // backgroundColor: 'red',
  },
});
