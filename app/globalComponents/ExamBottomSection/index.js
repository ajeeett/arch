import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { colors } from '../../utils/config/colors';
import { scaleByWidth } from '../../utils/config/theme';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RoundButton from '../RoundButton';
import styles from './style';
import { RadioButton, Text } from 'react-native-paper';
import RadioButtonSection from '../RadioButtonSection';
import I18n from '../../utils/config/I18n';


export default function ExamBottomSection(props) {

    console.log(props.activeQuestIndex, '-------props.activeQuestIndex');
    console.log(props.totalQuests, '-------props.totalQuests');
    return (

        <View style={styles.container}>
            {/* <RadioButtonSection props. /> */}
            {/* <RadioButtonSection setValue={(val) => {
                console.warn(val, '--a')
                props.setValue(val)
            }}
                value={props.value}
            /> */}
            <View style={props.activeQuestIndex == 0 || props.activeQuestIndex == props.totalQuests ? styles.subContainer1 : styles.subContainer}>
                {props.activeQuestIndex == 0 ? null : <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={props.activeQuestIndex == props.totalQuests ? styles.previousBtn1 : styles.previousBtn}
                    title={I18n.t('test_section_button.previous')}
                    handler={props.goToPrevious}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />}

                <RoundButton
                    btnText={styles.darkText}
                    btnStyle={props.activeQuestIndex == 0 || props.activeQuestIndex == props.totalQuests ? styles.whiteBtn1 : styles.whiteBtn}
                    title={I18n.t('test_section_button.clear')}
                    handler={props.clear}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />

                {props.activeQuestIndex == props.totalQuests ? null :
                    <RoundButton
                        btnText={styles.maxMarksText}
                        btnStyle={props.activeQuestIndex == 0 ? styles.greenBtn1 : styles.greenBtn}
                        title={I18n.t('test_section_button.save_next')}
                        handler={props.saveNext}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    />}



            </View>

            <View style={styles.subContainer}>

                <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={styles.violetBtn}
                    title={I18n.t('test_section_button.mark_review')}
                    handler={props.markForReview}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />
                <RoundButton
                    handler={props.submitTest}
                    btnText={styles.darkText}
                    btnStyle={styles.yellowBtn}
                    title={I18n.t('test_section_button.submit')}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />
            </View>
        </View>
    )
}