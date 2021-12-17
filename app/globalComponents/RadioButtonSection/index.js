import React from 'react';
import { View } from 'react-native';
import { colors } from '../../utils/config/colors';
import CustomText from '../CustomText';
import styles from './style';
import { RadioButton, Text } from 'react-native-paper';


export default function RadioButtonSection(props) {
    return (

        <View style={styles.container}>
            <RadioButton.Group onValueChange={newValue => props.setValue(newValue)} value={props.value}>
                <View style={styles.radioContainer}>
                    <RadioButton disabled={props.disabled} value="A" color={colors.appBlue} />
                    <Text>(A)</Text>

                </View>
                <View style={styles.radioContainer}>
                    <RadioButton disabled={props.disabled} value="B" color={colors.appBlue} />
                    <Text>(B)</Text>

                </View>
                <View style={styles.radioContainer}>
                    <RadioButton disabled={props.disabled} value="C" color={colors.appBlue} />
                    <Text>(C)</Text>

                </View>
                <View style={styles.radioContainer}>
                    <RadioButton disabled={props.disabled} value="D" color={colors.appBlue} />
                    <Text>(D)</Text>

                </View>
            </RadioButton.Group>
            <CustomText content={props.label} styles={props.labelStyle} />

        </View>
    )
}