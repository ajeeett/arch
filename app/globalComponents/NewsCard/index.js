import React from 'react';
import { View, Image, Pressable, ImageBackground } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';
import { isTablet } from 'react-native-device-info'

export default function NewsCard(props) {

    return (
        <Pressable style={isTablet() ?
            styles.tabOuter
            : styles.normalOuter}>

            <ImageBackground resizeMode={'stretch'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.viewStyle}>
                    <View style={styles.newsTag}>
                        <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.newsText} content={props.newsText} />
                    </View>
                    <Image style={styles.imgStyle} source={props.headImage} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                </View>
            </ImageBackground>
        </Pressable>
    )
}