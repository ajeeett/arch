import React from 'react';
import { View, Image, Pressable, ImageBackground } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';

export default function AdditionalResCard(props) {
    return (
        <Pressable style={styles.pressableStyle} onPress={props.onPress}>
            <ImageBackground resizeMode={'stretch'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.innerContainer}>
                    <Image style={styles.imageStyle} source={props.headImage} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                </View>
            </ImageBackground>
        </Pressable>
    )
}