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
import RoundButton from '../RoundButton';

export default function CoursesCardZeroState(props) {
    return (
        <View onPress={props.onPress} style={isTablet() ?
            styles.tabOuter
            : styles.normalOuter}>

            <ImageBackground resizeMode={'stretch'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.outerView}>
                    <Image style={styles.imgStyle} source={props.headImage} />
                    <RoundButton
                        btnText={styles.exploreTxt}
                        btnStyle={styles.exploreBtn}
                        title={'EXPLORE COURSES'}
                        handler={props.exploreCourses}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    />

                </View>
            </ImageBackground>
        </View>
    )
}