import React from 'react';
import { View } from 'react-native';
import RoundButton from '../RoundButton';
import styles from './style';
import I18n from '../../utils/config/I18n';

export default function ExamEvaluationBottomSection(props) {


    return (

        <View style={styles.container}>
            {/* <RadioButtonSection props. /> */}
            {/* <RadioButtonSection setValue={(val) => {
                console.warn(val, '--a')
                props.setValue(val)
            }}
                value={props.value}
            /> */}
            <View style={styles.subContainer}>
                <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={styles.previousBtn}
                    title={I18n.t('test_section_button.previous')}
                    handler={props.goToPrevious}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />

                <RoundButton
                    btnText={styles.darkText}
                    btnStyle={styles.yellowBtn}
                    title={I18n.t('test_section_button.home')}
                    handler={props.goToHome}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />

                <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={styles.greenBtn}
                    title={I18n.t('test_section_button.next')}
                    handler={props.nextQuestion}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />



            </View>

            {/* <View style={styles.subContainer}>

                <RoundButton
                    btnText={styles.maxMarksText}
                    btnStyle={styles.violetBtn}
                    title={'MARK FOR REVIEW'}
                    handler={props.markForReview}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />
                <RoundButton
                    handler={props.submitTest}
                    btnText={styles.darkText}
                    btnStyle={styles.yellowBtn}
                    title={'SUBMIT TEST'}
                    // isLoginLoading={isLoader ? isLoginLoading : false}
                    disabled={false}
                />
            </View>
         */}

        </View>
    )
}