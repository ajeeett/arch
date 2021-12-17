import React, { useState } from 'react';
import { View, Image, Pressable, ImageBackground } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';
import { isTablet } from 'react-native-device-info';

export default function TeachersCoursesCard(props) {
    const [valid, setValid] = useState(true)

    return (
        <Pressable onPress={props.onPress} style={isTablet() ?
            styles.tabOuter
            : styles.normalOuter}>

            <ImageBackground resizeMode={'cover'}
                source={props.gradImg}
                style={{ ...styles.cardBg }}>

                <Image style={styles.imgStyle} source={props.headImage} />
                <View style={styles.imagePosition}>
                    {valid ?
                        <Image onError={() => {
                            setValid(false)
                        }} style={styles.imageSize} source={props.courseImage} />
                        : <Image style={styles.imageSize} source={require('./../../assets/images/pdfIconChapter.png')} />
                    }
                </View>

                <View style={styles.viewStyle}>

                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                </View>
            </ImageBackground>
        </Pressable>
    )
}