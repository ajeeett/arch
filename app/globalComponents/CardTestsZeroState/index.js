import React from 'react';
import { View, ImageBackground, Image, Pressable } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';
import WhiteBgPlayBtn from '../../assets/svg/WhiteBgPlayBtn';
import Timers from '../Timers';
import { isTablet } from 'react-native-device-info';

export default function CardTestsZeroState(props) {
    return (

        <View style={isTablet() ? styles.tabOuter : styles.normalOuter}>

            <View
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.viewStyle}>

                    <Image style={styles.imgStyle} source={props.headImage} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                </View>

            </View>
        </View>
    )
}