import React from 'react';
import { ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import styles from './style';
import { isTablet } from 'react-native-device-info'

export default function ScrollContainer(props) {
    const showHorizontalPadding = props.horizontalPadding ? isTablet() ?
        { marginHorizontal: (100) }
        : { marginHorizontal: (30) } : {};
    const showVerticalPadding = props.verticalPadding ? { paddingVertical: 20 } : {};

    return (

        <ScrollView showsVerticalScrollIndicator={false} onScroll={props.onScroll} contentContainerStyle={{
            ...styles.container,
            ...props.style,
            ...showVerticalPadding,
            ...showHorizontalPadding

        }}
        keyboardShouldPersistTaps={'always'}>
            {props.children}
        </ScrollView>

    )
}