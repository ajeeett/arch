import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';
import { colors } from '../utils/config/colors';

const Loader = (props) => {
    const {
        loading
    } = props;

    return (
        loading ?
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                        color={colors.appBlue}
                        size={'large'}
                    />
                </View>
            </View> : null
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 999
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.gradientBlueOpacity,
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loader;