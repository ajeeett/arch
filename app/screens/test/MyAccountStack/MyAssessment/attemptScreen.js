import React, { useEffect, useState } from 'react'
import { BackHandler, FlatList, Pressable, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from "lodash"
import Header from '../../../globalComponents/Header/index';
import I18n from '../../../utils/config/I18n';
import Loader from '../../../globalComponents/Loader';
import { showSnackBar } from '../../../utils/Helper/helper';
import CustomText from '../../../globalComponents/CustomText';
import { getAttemptDetailsClear, getAttemptDetailsRequest, getPaperAttemptsClear } from '../../../actions/myAssessmentAction';
import styles from './styles';
import AttemptModal from './AttemptModal';
import moment from 'moment';

const AttemptScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const myAssessmentResponse = useSelector(state => state.myAssessmentReducer);
    const attemptDetailsResponse = useSelector(state => get(state, 'myAssessmentReducer.attemptDetailsFetchSuccess', false))
    const attemptDetailsRedu = useSelector(state => get(state, 'myAssessmentReducer', false));

    const { paperAttempt, questionsJson } = route?.params;
    const [loading, setLoading] = useState(false);
    const [attemptDetails, setAttemptDetails] = useState([]);
    const [scoreSheet, setScoreSheet] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => {
            clearData();
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        }
    }, []);

    const handleBackButtonClick = async () => {
        clearData();

        navigation.goBack();
        return true;
    };

    const clearData = async () => {
        await dispatch(getPaperAttemptsClear());
    }

    const getAttemptDetails = async (attemptID) => {
        let payload = { attemptID }
        await dispatch(getAttemptDetailsRequest(payload));
        setLoading(true);
    }

    useEffect(() => {
        // console.log("attemptDetailsResponse =>", attemptDetailsResponse);
        if (myAssessmentResponse?.attemptDetailsFetchSuccess) {
            setAttemptDetails(myAssessmentResponse?.attemptDetails?.data);
            console.log(myAssessmentResponse?.attemptDetails?.data, '-- attempt details');
            setLoading(false);
            dispatch(getAttemptDetailsClear());
        } else if (myAssessmentResponse?.error) {
            // console.log('attempt details error ---!!');
            showSnackBar(myAssessmentResponse?.error)
            setLoading(false);
            dispatch(getAttemptDetailsClear());
        }
    }, [attemptDetailsResponse])

    // redirect to exam evalution screen
    useEffect(() => {
        console.log(attemptDetails, '----attemptdetails');
        if (!isEmpty(attemptDetails) && !isEmpty(attemptDetails?.attemptJson)) {
            var data = attemptDetails?.attemptJson;
            var test = JSON.parse(data);

            setScore(test?.totalScoreObtained);
            setAnswer(test?.answers);

            // console.log(JSON.parse(data), '---attemptdataaaaaaaaaaaaa');
            // console.log(test?.answers, '---attem@@@@@@@@@@@@ptdataaaaaaaaaaaaa');
            // console.log(attemptDetails, '---attemptDetails');
            // console.log(questionsJson, '---questionsJson');

            // console.log('questionsJson !=  && questionsJson != undefined', questionsJson != '' );
            if (questionsJson != '' && questionsJson != undefined) {
                // setScoreSheet(false);
                // navigation.navigate('OnlineExamEvaluation', {
                //     answersArray: test?.answers,
                //     questList: questionsJson
                // });
                setScoreSheet(true)

            }

        }
    }, [attemptDetails]);

    const CustomImageContainer = ({ source }) => {
        return (
            <Image
                source={source}
                style={{ borderRadius: 5 }}
                resizeMode="cover"
                width={88}
                height={88}
            />
        );
    };

    // FLATLIST - render each item of the test 
    const renderItem = ({ item }) => {
        // console.log(item, '----Item quality');
        return (
            <Pressable onPress={() => {
                // setScoreSheet(true)
                // setAttemptId(item?.attemptID)
                getAttemptDetails(item?.attemptID)
            }} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <CustomImageContainer source={require('./../../../assets/images/assessmentIcon.png')} />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <View style0={styles.itemWrapper}>
                        <CustomText styles={styles.headerText} content={'Attempt ' + item?.attemptNo} ellipseMode={'tail'} lineNumbers={1} />
                        <CustomText styles={styles.contentText} content={moment(item?.attemptTime).format("DD/MM/YYYY")} ellipseMode={'tail'} lineNumbers={1} />
                        {/* <CustomText styles={styles.contentText} content={`Total score: ${item?.totalScoreObtained}`} /> */}
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                leftGroupName={'Ionicons'}
                leftIcon={'arrow-back'}
                leftAction={() => {
                    navigation.goBack();
                }}
                headerLabel={I18n.t('myAccount.my_acc_assess')}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.containerWrapper}>
                    {paperAttempt && paperAttempt.length > 0 ?
                        <View style={styles.listItem}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={paperAttempt}
                                renderItem={renderItem}
                                keyExtractor={item => item?.attemptNo}
                            />
                        </View> : null}
                </View>
            </View>
            <Loader loading={loading} />

            {/* score modal */}
            {
                scoreSheet && (
                    <Pressable
                        onPressIn={() => {
                            setScoreSheet(!scoreSheet);
                        }}
                        onPress={() => { }}
                        style={styles.modalStyle}>
                        <AttemptModal
                            desc={`Total Marks obtained = 0`}
                            modalVisible={scoreSheet}
                            setModalVisibility={() => {
                                setScoreSheet(!scoreSheet);
                            }}
                            cancelAction={() => {
                                setScoreSheet(!scoreSheet);
                            }}
                            score={score}
                            reviewResult={() => {
                                setScoreSheet(false);
                                navigation.navigate('OnlineExamEvaluation', {
                                    answersArray: answer,
                                    questList: questionsJson
                                })
                            }}
                        />
                    </Pressable>
                )
            }
        </View>
    )
}

export default AttemptScreen