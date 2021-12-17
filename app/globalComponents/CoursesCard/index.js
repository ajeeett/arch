import React, { Children, useState } from 'react';
import { View, Image, Animated, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Pressable, ImageBackground } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { ProgressBar, Colors } from 'react-native-paper';
import VectorIcon from '../VectorIcon';
import CustomText from '../CustomText';
import BlueCardBg from '../../assets/svg/BlueCardBg';
import TestsLogo from '../../assets/svg/TestsLogo';
import { isTablet } from 'react-native-device-info'
import ProgressHorizontal from '../ProgressHorizontal';

export default function CoursesCard(props) {
    const [valid, setValid] = useState(true)
    // console.log(props.courseImage, '-----courseImage');
    return (
        <Pressable onPress={props.onPress} style={isTablet() ?
            styles.tabOuter
            : styles.normalOuter}>

            <ImageBackground resizeMode={'stretch'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <View style={styles.outerView}>
                    {/* <View style={styles.newsTag}>
                        <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.newsText} content={props.newsText} />
                    </View> */}
                    {valid ?
                        <Image onError={() => {
                            setValid(false)
                        }} style={styles.imgStyle} source={{ uri: props.courseImage }} />
                        : <Image style={styles.imgStyle} source={props.headImage} />
                    }

                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />

                    <ProgressHorizontal progress={props?.progress} />


                    {/* <Animated.Text style={[{ left: props.percentage, right: 0, borderWidth: 1 }, styles.label]}>
                        {props.progress}%
                    </Animated.Text>
                    <View style={styles.container}>

                        <Animated.View
                            style={[
                                styles.inner, { width: props.progress + "%" },
                            ]}
                        />

                    </View> */}


                </View>
            </ImageBackground>
        </Pressable>
    )
}