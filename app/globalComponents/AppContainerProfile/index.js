import React from 'react';
import { ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { isTablet } from 'react-native-device-info'
import { View } from 'react-native-animatable';

export default function AppContainerProfile(props) {
    const showHorizontalPadding = props.horizontalPadding ?
        isTablet() ?
            { marginHorizontal: (100) }
            :
            { marginHorizontal: (42) }
        :
        {};
    const showVerticalPadding = props.verticalPadding ? { paddingVertical: 20 } : {};

    return (

        <ImageBackground source={require('./../../assets/images/loginbg.png')} style={styles.cardBg}>
            <ScrollView contentContainerStyle={{
                ...styles.container,
                ...props.style,
                // ...showVerticalPadding,
                // ...showHorizontalPadding

            }}>
                {props.children}
            </ScrollView>

        </ImageBackground>
    )
}