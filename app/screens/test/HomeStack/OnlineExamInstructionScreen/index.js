import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Header from "../../../globalComponents/Header/index";
import OnlineExamTopSection from '../../../globalComponents/OnlineExamTopSection/index';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { colors } from '../../../utils/config/colors';
import CheckBoxSection from '../../../globalComponents/CheckBoxSection';
import RoundButton from '../../../globalComponents/RoundButton';
import { showSnackBar } from '../../../utils/Helper/helper';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { clearTestsPermission, fetchTestDetails, fetchTestsPermission } from '../../../actions/onlineExamActions';
import Loader from '../../../globalComponents/Loader';
import HTMLRenderer from '../../../globalComponents/HTMLRenderer';

export default function OnlineExamInstructionScreen({ navigation, route }) {

    const { testType, testId } = route?.params;
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questionsJson, setQuestionsJson] = useState('');

    const dispatch = useDispatch();
    const testsListReducer = useSelector(state => state.onlineExamReducer);
    const examPermission = useSelector(state => state.onlineExamPermissionReducer);

    useFocusEffect(
        React.useCallback(() => {

            // const { testId } = route?.params;
            console.log(testId, '---000testId');
            fetchTestDetailsData(testId);

            return () => {

            }
        }, [])
    );

    useEffect(() => {
        setLoading(false);
        if (testsListReducer?.detailsFetched) {
            console.log(testsListReducer, '--??');

            if (testsListReducer?.testDetails?.data?.data?.listQuestion?.length > 0)
                setQuestionsJson(testsListReducer?.testDetails?.data);
            else {
                showSnackBar("Something went wrong.");
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            }
            // dispatch(clearCourseProduct());
        }
        else if (testsListReducer?.error) {
            showSnackBar(testsListReducer?.error);
            // dispatch(clearCourseProductDetail());
        }
    }, [testsListReducer]);

    useEffect(() => {
        console.log(examPermission, '--- exam permssion');
        if (examPermission?.navigateToExam) {
            // let updatedExamPermission = {
            //     data: {
            //         ...examPermission?.testsPermission?.data,
            //         paperDuration: 25,
            //         testDate: '2021-11-09T00:00:00',
            //         startTime: '15:25:00'
            //     }
            // };
            // console.log(updatedExamPermission, '---updatedExamPermission');
            // console.log(updatedExamPermission, '---updatedExamPermission');
            console.log(examPermission?.testsPermission, '----------------json daattaa');

            if (examPermission?.testsPermission?.data?.listQuestion?.length > 0 && examPermission?.testsPermission?.data?.paperDuration != 0) {
                navigation.navigate('OnlineExamScreen', {
                    // questionJson: updatedExamPermission,
                    questionJson: examPermission?.testsPermission,
                    testType, testId,
                })
            }
            else if (examPermission?.testsPermission?.data?.paperDuration == 0) {
                showSnackBar("Your entry time for this test has been expired.");
            } else {
                showSnackBar("Something went wrong.");
            }
            dispatch(clearTestsPermission());
        }
        else if (examPermission?.error) {
            showSnackBar(examPermission?.error);
            dispatch(clearTestsPermission());
        }
    }, [examPermission])

    const fetchTestDetailsData = async (testId) => {
        let payload = {
            "TestId": testId
        }
        await dispatch(fetchTestDetails(payload));
        setLoading(true);

    };

    const startTest = async () => {
        if (checked) {
            if (testType != undefined && testType == 2) {
                navigation.navigate('OnlineExamScreen', {
                    questionJson: questionsJson,
                    testType, testId
                })
            } else {
                let payload = {
                    TestData: questionsJson?.data
                }
                await dispatch(fetchTestsPermission(payload));
            }
        } else {
            showSnackBar('Please Accept the terms & conditions')
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollContainer>
                <View style={styles.container}>
                    <Header leftGroupName={'Ionicons'}
                        leftIcon={'arrow-back'}
                        leftAction={() => { }}
                        headerLabel={questionsJson?.data?.testCode ? questionsJson?.data?.testCode : ''} />

                    {questionsJson && questionsJson != '' ?
                        <OnlineExamTopSection heading={questionsJson?.data?.testTitle}
                            maxMarksText={`MAX MARKS ${Math.round(Number(questionsJson?.data?.testMM))}`}
                            maxTimeText={`MAX TIME ${Math.round(Number(questionsJson?.data?.paperDuration))} MINUTES`}
                            totalQText={`TOTAL QUESTIONS ${Math.round(Number(questionsJson?.data?.totalQuestion))}`}
                        /> : null}

                    <View style={styles.padd20}>

                        <HTMLRenderer
                            html={questionsJson?.data?.paperInstruction}></HTMLRenderer>
                        {/* <CustomText styles={styles.titleText} content={'You are given 10 Mins to read these instructions'} />

                        <CustomText styles={styles.descText} content={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'} /> */}
                    </View>
                </View>
            </ScrollContainer>
            {questionsJson && questionsJson != '' ?
                <View style={{
                    // flex: 1,
                    paddingHorizontal: 20,
                    backgroundColor: colors.lightGray,
                    // paddingVertical: isTablet() ? 10 : 0

                }}>
                    <CheckBoxSection
                        setChecked={(val) => {
                            // console.warn(val)
                            setChecked(val)
                        }}
                        checked={checked}
                        labelStyle={styles.checkboxLabel}
                        label={'I agree to the Terms and Conditions.'} />

                    <RoundButton
                        btnText={styles.exploreText}
                        btnStyle={styles.exploreBtn}
                        title={'START TEST'}
                        handler={startTest}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    />
                </View>
                : null
            }
            <Loader loading={loading} />

        </View>
    );
}
