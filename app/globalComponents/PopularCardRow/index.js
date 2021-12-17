import React from 'react';
import { View, Image, Pressable } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';

export default function PopularCardRow(props) {
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.viewWidth}>
                <View style={styles.viewFlex}>
                    <Image style={styles.imgStyle} source={props.headImage} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                    <CustomText lineNumbers={2} ellipseMode={'tail'} styles={styles.cost} content={props.cost} />
                </View>
            </View>
        </Pressable>
    )
}