import React, { Children, useState } from 'react';
import { View, Image, Animated, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Pressable, ImageBackground } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { ProgressBar, Colors } from 'react-native-paper';
import VectorIcon from '../VectorIcon';
import CustomText from '../CustomText';
import BlueCardBg from '../../assets/svg/BlueCardBg';
import TestsLogo from '../../assets/svg/TestsLogo';
import { isTablet } from 'react-native-device-info'
import ProgressHorizontal from '../ProgressHorizontal';
import I18n from 'i18n-js';

export default function UpcomingLiveClassZero(props) {
    return (
        <View style={isTablet() ?
            styles.tabOuter
            : styles.normalOuter}>

            <ImageBackground resizeMode={'stretch'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.outerView}>

                    <Image style={styles.imgStyle} source={props.headImage} />


                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={I18n.t("home.no_live_classes_planned")} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.subHeading} content={I18n.t("home.no_live_classes_planned")} />


                </View>
            </ImageBackground>
        </View>
    )
}