import React, { Children, useState } from 'react';
import { View, Image, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Pressable, ImageBackground } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import VectorIcon from '../VectorIcon';
import CustomText from '../CustomText';
import BlueCardBg from '../../assets/svg/BlueCardBg';
import TestsLogo from '../../assets/svg/TestsLogo';

export default function CoursesTopSection(props) {
    console.log(props.courseImage, '--props.courseImage');
    const [valid, setValid] = useState(true)


    return (
        <View>
            <CustomText styles={styles.titleText} content={props.title} />

            <Image
                onError={() => {
                    setValid(false)
                }}
                // onError={onError}
                resizeMode={'stretch'}
                style={styles.courseImage} source={valid ? {
                    uri:
                        props.courseImage
                } :
                    require('./../../assets/images/courseDetailZero.png')} />
            <CustomText styles={styles.descriptionText} content={props.desc} />

        </View>


    )
}