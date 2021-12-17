import React from 'react';
import { ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { isTablet } from 'react-native-device-info'

export default function AppContainer(props) {
    const showHorizontalPadding = props.horizontalPadding ?
        isTablet() ?
            { marginHorizontal: (100) }
            :
            { marginHorizontal: (42) }
        :
        {};
    const showVerticalPadding = props.verticalPadding ? { paddingVertical: 20 } : {};

    return (

        <ImageBackground resizeMode={'stretch'} style={styles.imgBg} source={require('./../../assets/images/loginbg.png')}>
            <ScrollView contentContainerStyle={{
                ...styles.container,
                ...props.style,
                ...showVerticalPadding,
                ...showHorizontalPadding

            }}
                keyboardShouldPersistTaps={'always'}>
                {props.children}
            </ScrollView>

        </ImageBackground>
    )
}