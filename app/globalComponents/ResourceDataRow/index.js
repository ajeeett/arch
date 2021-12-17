import React from 'react';
import { View, Image, Pressable } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';

export default function ResourceDataRow(props) {

    return (
        <Pressable style={styles.pressableWidth} onPress={props.onPress}>
            <View style={styles.viewContainer}>
                <Image resizeMode={'cover'}
                    source={props.bgImage}
                    style={{ ...props.style, ...styles.cardBg }} />
                <Image style={styles.gradImg} resizeMode={'cover'} source={props.gradImg} />
                <Image style={styles.headImg} source={props.headImage} />
                <View style={styles.customTextStyle}>
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                </View>
            </View>
        </Pressable>
    )
}