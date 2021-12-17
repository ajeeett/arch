import React, { Children } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import { scaleByWidth } from '../../utils/config/theme';
import styles from './style';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import VectorIcon from '../VectorIcon';

export default function CardBg(props) {
    const showHorizontalPadding = props.horizontalPadding ? { marginHorizontal: (30) } : {};
    const showVerticalPadding = props.verticalPadding ? { paddingVertical: 20 } : {};

    return (

        <Pressable
            style={{ ...props.style, ...styles.cardBg }}
        >{props.children}
        </Pressable>
    )
}