import React from 'react';
import { View, Image, Pressable, ImageBackground } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';

export default function NewsCardRow(props) {

    return (
        <View style={props.cardStyle}>
            <Pressable>
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
        </View>
    )
}