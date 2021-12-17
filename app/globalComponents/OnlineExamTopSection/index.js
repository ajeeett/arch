import React from 'react';
import { View } from 'react-native';
import { colors } from '../../utils/config/colors';
import CustomText from '../CustomText';
import RoundButton from '../RoundButton';
import styles from './style';

export default function OnlineExamTopSection(props) {

    return (

        <View style={styles.container}>
            <CustomText styles={styles.heading} content={props.heading} />

            <View style={styles.buttonContainer}>
                <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={styles.maxMarksBtn}
                    title={props.maxMarksText}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />

                <RoundButton
                    btnText={styles.maxTimeText}
                    btnStyle={styles.maxTimeBtn}
                    title={props.maxTimeText}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />

                <RoundButton
                    btnText={styles.totalQText}
                    btnStyle={styles.totalQBtn}
                    title={props.totalQText}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />
            </View>
        </View>
    )
}