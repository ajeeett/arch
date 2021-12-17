import React, { useState } from 'react';
import { TextInput, View, ScrollView, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import CountryPicker from './CountryPicker';
import styles from './style';
import { colors } from '../../utils/config/colors';
import { fontRegular } from '../../utils/config/fonts';

export default function CountryCodePicker(props) {


    return (
        <View style={styles.outerContainer}>
            <CountryPicker
                disable={false}
                hideCountryFlag={true}
                animationType={'slide'}
                containerStyle={styles.pickerStyle}
                pickerTitleStyle={styles.pickerTitleStyle}
                //   dropDownImage={require('./res/ic_drop_down.png')}
                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                countryNameTextStyle={styles.countryNameTextStyle}
                pickerTitle={'Select your country'}
                searchBarPlaceHolder={'Search......'}
                hideCountryCode={false}
                searchBarStyle={styles.searchBarStyle}
                //   backButtonImage={require('./res/ic_back_black.png')}
                //   searchButtonImage={require('./res/ic_search.png')}
                countryCode={props.countryCode}
                selectedValue={props.selectedValue}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[
                            styles.textInputStyle,
                            props.textInputStyle,
                        ]}
                        underlineColor='transparent'
                        underlineColorAndroid="transparent"
                        // selectionColor="#000"
                        key={props.id}
                        placeholderStyle={styles.textboxfieldd}
                        placeholderTextColor={colors.darkGray}
                        placeholder={props.placeholder}
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

                    {/* {props.iconGrpName && props.iconName && (
            <VectorIcon
              groupName={props.iconGrpName}
              name={props.iconName}
              size={props.iconSize ? props.iconSize : 20}
              color={props.iconColor ? props.iconColor : 'rgba(0,0,0,0.5)'}
              style={[styles.ImageStyle, props.iconStyle]}
            />
          )} */}
                </View>
            </TouchableWithoutFeedback>
        </View>

    )
}