import React from 'react';
import { View, Animated } from 'react-native';
import styles from './style';

export default function ProgressHorizontal(props) {
    const progress = props?.progress < 100 ? props?.progress : "100";

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.inner, { width: progress + "%" },
                ]}
            >
                <Animated.Text style={progress > 80 ?
                    styles.labelCenter : [{ paddingStart: 5, left: '100%' }, styles.label]}>
                    {progress}%
                </Animated.Text>
            </Animated.View>
        </View >
    )
}