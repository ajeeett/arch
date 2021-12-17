import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { colors } from '../../utils/config/colors';
import { scaleByWidth } from '../../utils/config/theme';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RoundButton from '../RoundButton';
import styles from './style';
import { Checkbox } from 'react-native-paper';

export default function CheckBoxSection(props) {


    return (

        <View style={styles.container}>
            <Checkbox
                status={props.checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    props.setChecked(!props.checked);
                }}
                color={colors.appBlue}
                theme={{ colors: { primary: colors.appBlue } }}
            />

            <CustomText content={props.label} styles={props.labelStyle} />

        </View>
    )
}