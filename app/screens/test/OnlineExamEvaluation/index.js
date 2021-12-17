import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    Alert,
    Image,
    Pressable,
    Platform,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles';
import ScrollContainer from '../../globalComponents/ScrollContainer';
import { colors } from '../../utils/config/colors';
import CustomText from '../../globalComponents/CustomText';
import RadioButtonSection from '../../globalComponents/RadioButtonSection';
import ExamInstructionHead from '../../globalComponents/ExamInstructionHead';
import ProgressModal from './modal/ProgressModal';
import { width } from '../../utils/config/theme';
import { CheckBoxGroup } from '../../globalComponents/CheckBoxGroup';
import IntegerInputBox from '../../globalComponents/IntegerInputBox';
import CheckBoxMatrix from '../../globalComponents/CheckboxMatrix/index';
import ExamEvaluationBottomSection from '../../globalComponents/ExamEvaluationBottomSection';
import { fontRegular } from '../../utils/config/fonts';
import RNFetchBlob from 'rn-fetch-blob';

var arr = [];
var initialQuestionsArr = [];

export default function OnlineExamEvaluation({ navigation, route }) {

    console.log('params in onlineExamEvalution screen', route?.params);
    const { questList, answersArray, solutionPathUrl } = route?.params;
    console.log('questList in onlineExamEvalution screen', questList);


    const [selectedValueMatrix, setSelectedValueMatrix] = useState('');



    const [checked, setChecked] = useState('');
    const [test, setTest] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [submitSheetVisible, setSubmitSheetVisible] = useState(false);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue1, setSelectedValue1] = useState([]);
    const [answersArr, setAnswersArr] = useState([]);
    const [visible, setVisible] = useState(false);
    const [checkSelected, setCheckSelected] = useState([]);
    const [fromPrevious, setFromPrevious] = useState(false);
    const [resetCheckMatrix, setResetCheckMatrix] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [valid, setValid] = useState(true)
    const childRef = useRef();

    useEffect(() => {
        const totalQues = questList.data.listQuestion.length;
        setTotalCount(totalQues);
        setVisible(false)

        // const { answersArray } = route?.params;
        console.log(answersArray, '----previsous screen array');
        setAnswersArr(answersArray)
        setRow(question.addInfo_1);
        setColumn(question.addInfo_2);
        loadFirstQuestion(answersArray[0]?.questionCode, answersArray)
        return () => {
            initialQuestionsArr = [];
        }
    }, []);

    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: visible
        });
        return () =>
            parent.setOptions({
                tabBarVisible: visible
            });
    }, [visible]);


    const renderItem = ({ item, index }) => {

        return (
            <View style={{ width: width, alignItems: 'center' }}>
                <Image style={{ flex: 1, width: width, }} source={require('./../../assets/images/bluebgcard.png')} />
                <Text style={{ fontSize: 20 }}>{item.name}</Text>


                {/* <FlatList
                    data={testData}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    )}

                /> */}
            </View>
        );
    };


    useEffect(() => {
        console.log('value change of selected radio', selectedValue);
    }, [selectedValue])


    useEffect(() => {
        console.log('value change of selected checkbox', selectedValue1);
    }, [selectedValue1])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () =>
            BackHandler.removeEventListener(
                'hardwareBackPress', handleBackButtonClick,
            );
    }, []);

    const handleBackButtonClick = async () => {
        setVisible(true);
        navigation.popToTop("Home");
        return true;
    };

    const goToPrevious = (questionCode) => {
        setFromPrevious(true)
        if (activeQuestionIndex > 0) {
            // setChecked(false)
            // setAnswered(false);
            console.log(questionCode, '=---questionCode');
            var index = activeQuestionIndex - 1
            console.log('prevtap1', answersArr);
            console.log('index on prevTap', index);
            console.log('prevtap', answersArr[index].value);
            setActiveQuestionIndex(index);
            console.log(questions[index].questionTypeCode, '=---questionCODENEW');

            questions[index].questionTypeCode == "SC" ? setChecked(answersArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(answersArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setResetCheckMatrix(answersArr[index].value ? true : false) :
                        setCheckSelected(answersArr[index].value)

            if (questions[index].questionTypeCode == "MT") {
                setRow(questions[index].addInfo_1)
                setColumn(questions[index].addInfo_2)
            }

            questions[index].questionTypeCode == "SC" ? setSelectedValue(answersArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(answersArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setSelectedValueMatrix(answersArr[index].value) :
                        setSelectedValue1(answersArr[index].value)
            // setChecked(answersArr[index].value);
            // setSelectedValue(answersArr[index].value);
            if (childRef.current != null)
                childRef.current.resetCheckBoxState();

            console.log(answersArr[index].value, '---selectedValueMatrix on prevtap');
            return;
        } else {
            // hidePrevBtn
        }

    }

    const goToNext = (questionCode, isFirstTime) => {
        var activeIndex = activeQuestionIndex + 1;
        console.log(activeIndex, '---act#####');
        console.log(answersArr.length, '---answersArr.length#####');
        // setActiveQuestionIndex(activeIndex);
        console.log('#0000012121212');
        if (activeIndex > 0 && activeIndex < answersArr.length) {
            // setChecked(false)
            // setAnswered(false);
            console.log(questionCode, '=---questionCode');
            var index = activeIndex
            console.log('prevtap1', answersArr);
            console.log('index on prevTap', index);
            console.log('prevtap', answersArr[index].value);
            setActiveQuestionIndex(index);
            console.log(questions[index].questionTypeCode, '=---questionCODENEW');

            questions[index].questionTypeCode == "SC" ? setChecked(answersArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(answersArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setResetCheckMatrix(answersArr[index].value ? true : false) :
                        setCheckSelected(answersArr[index].value)

            if (questions[index].questionTypeCode == "MT") {
                setRow(questions[index].addInfo_1)
                setColumn(questions[index].addInfo_2)
            }

            questions[index].questionTypeCode == "SC" ? setSelectedValue(answersArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(answersArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setSelectedValueMatrix(answersArr[index].value) :
                        setSelectedValue1(answersArr[index].value)
            // setChecked(answersArr[index].value);
            // setSelectedValue(answersArr[index].value);
            if (childRef.current != null)
                childRef.current.resetCheckBoxState();

            console.log(answersArr[index].value, '---selectedValueMatrix on prevtap');
            return;
        } else {
            // hidePrevBtn
        }

    }

    const loadFirstQuestion = (questionCode, ansArr) => {
        var activeIndex = activeQuestionIndex;
        if (activeIndex == 0) {
            console.log(questionCode, '=---questionCode');
            var index = activeIndex
            console.log('prevtap1', ansArr);
            console.log('index on prevTap', index);
            console.log('prevtap', ansArr[index].value);
            setActiveQuestionIndex(index);
            console.log(questions[index].questionTypeCode, '=---questionCODENEW');

            questions[index].questionTypeCode == "SC" ? setChecked(ansArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(ansArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setResetCheckMatrix(ansArr[index].value ? true : false) :
                        setCheckSelected(ansArr[index].value)

            if (questions[index].questionTypeCode == "MT") {
                setRow(questions[index].addInfo_1)
                setColumn(questions[index].addInfo_2)
            }

            questions[index].questionTypeCode == "SC" ? setSelectedValue(ansArr[index].value) :
                questions[index].questionTypeCode == "IN" ?
                    setInputValue(ansArr[index].value) :
                    questions[index].questionTypeCode == "MT" ?
                        setSelectedValueMatrix(ansArr[index].value) :
                        setSelectedValue1(ansArr[index].value)
            if (childRef.current != null)
                childRef.current.resetCheckBoxState();

            console.log(ansArr[index].value, '---selectedValueMatrix on prevtap');
            return;
        } else {
            // hidePrevBtn
        }
    }
    const goToQuestion = (goToQuestion) => {
        // setChecked(false)
        console.log(goToQuestion, '--go toquestion');
        var activeIndex = parseInt(goToQuestion?.questionNo) - 1;
        console.log(activeIndex, '--activeIndex');
        console.log(answersArr[activeIndex].value, '--answersArr[activeIndex].value');

        setActiveQuestionIndex(activeIndex)
        // setChecked(answersArr[activeIndex].value);
        // setSelectedValue(answersArr[activeIndex].value);
        questions[activeIndex].questionTypeCode == "SC" ? setChecked(answersArr[activeIndex].value)
            : questions[activeIndex].questionTypeCode == "IN" ?
                setInputValue(answersArr[activeIndex].value) :
                questions[activeIndex].questionTypeCode == "MT" ?
                    setResetCheckMatrix(answersArr[activeIndex].value ? true : false)
                    : setCheckSelected(answersArr[activeIndex].value)

        if (questions[activeIndex].questionTypeCode == "MT") {
            setRow(questions[activeIndex].addInfo_1)
            setColumn(questions[activeIndex].addInfo_2)
        }

        questions[activeIndex].questionTypeCode == "SC" ? setSelectedValue(answersArr[activeIndex].value) :
            questions[activeIndex].questionTypeCode == "IN" ?
                setInputValue(answersArr[activeIndex].value) :
                questions[activeIndex].questionTypeCode == "MT" ?
                    setSelectedValueMatrix(answersArr[activeIndex].value) :
                    setSelectedValue1(answersArr[activeIndex].value)
        if (childRef.current != null)
            childRef.current.resetCheckBoxState();
    }

    const getQuestionType = (code) => {
        switch (code) {
            case 'MC': return 'Multiple Choice';
            case 'MT': return 'Matrix Type';
            case 'IN': return 'Input Type';
            case 'SC': return 'Single Choice';
        }
    }

    const questions = questList.data.listQuestion;
    const question = questions[activeQuestionIndex];
    console.log(question, '--question');

    return (
        <View
            style={{ flex: 1 }}
        >
            <ScrollContainer>
                <View style={styles.container}>
                    {/* <Header leftGroupName={'Ionicons'}
                        leftIcon={'arrow-back'}
                        leftAction={() => { }}
                        hideBack
                        headerLabel={'TEST 01'} /> */}

                    <ExamInstructionHead
                        showProgress={() => {
                            setBottomSheetVisible(true)
                        }}
                        hideTimer={true}
                        over={() => {
                            Alert.alert(
                                "",
                                "You ran out of time. Auto-submitting your answers...",
                                [
                                    {
                                        text: "Ok",
                                        onPress: () => {
                                            console.log('answesarr', answersArr)
                                            setTest(true)
                                        },
                                    },

                                ]
                            );
                        }

                        }
                        timer={(0) * 60000}
                        // timer={1 * 10000}
                        heading={`${questions[activeQuestionIndex].subjectTitle} • ${questions[activeQuestionIndex].chapterTitle}`}
                        individualMarks={answersArray[activeQuestionIndex]?.individualMarkForQuestion}
                        isReviewScreen={true}
                    />

                    <View style={{ flex: 1 }}>
                        <View style={styles.padd20}>
                            <TouchableOpacity onPress={() => {
                                console.log(checkSelected, '==')
                            }}>
                                <CustomText styles={styles.questionText} content={`Question ${question.questionNo} (${getQuestionType(question.questionTypeCode)})`} />

                            </TouchableOpacity>
                            <View>
                                <AutoHeightImage
                                    width={width}
                                    resizeMode="contain"
                                    onError={() => {
                                        setValid(false)
                                    }}
                                    source={{ uri: question.mobileSolutionPath }}
                                /></View>

                            {/* <Image style={{

                                width: '100%', height: height - 200,
                                alignSelf: 'center'
                            }}
                                resizeMode={'contain'}
                                source={{ uri: question.mobileSolutionPath }} /> */}
                            {/* <Image style={isTablet() ? {
                                flex: 1,
                            } : {
                                // flex: 1,
                                width: '100%', height: height - 250,
                            }}
                                resizeMode={'contain'}
                                source={{ uri: question.MobileQuestionPath }} /> */}

                            {/* <FlatList
                                data={testData}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                horizontal={true}
                                snapToAlignment={"start"}
                                snapToInterval={width + 10} // Adjust to your content width
                                decelerationRate={"fast"}
                                pagingEnabled
                                viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
                                disableIntervalMomentum
                            /> */}



                        </View>

                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        backgroundColor: colors.lightGray,
                        paddingVertical: 10

                    }}>
                        <CustomText
                            styles={{ fontSize: 12, fontFamily: fontRegular }}
                            content={'Your Answer- '}
                        />

                        {question.questionTypeCode == "SC" ?
                            <RadioButtonSection
                                setValue={(selectedOption) => {
                                    // console.warn(selectedOption, '--a')
                                    setChecked(selectedOption);
                                    setSelectedValue(selectedOption);
                                    answer(selectedOption, question.Answer)
                                }}
                                value={checked}
                                disabled={true}

                            />
                            :
                            question.questionTypeCode == "IN" ?
                                <IntegerInputBox
                                    placeholder={'Enter your value here'}
                                    keyboardType={'default'}
                                    changeTextHandler={(value) => {
                                        setInputValue(value.trim())
                                    }}
                                    disabled={false}
                                    id="intInput"
                                    value={inputValue}
                                /> :
                                question.questionTypeCode == "MC" ?
                                    <CheckBoxGroup
                                        resetCheck={checkSelected}
                                        disabled={true}
                                        selectedData={value => {
                                            console.log(value, '--?############')
                                            setCheckSelected(value)
                                            setSelectedValue1(value);
                                        }}
                                    />
                                    :
                                    <CheckBoxMatrix
                                        // row={question.AddInfo_1}
                                        // column={question.AddInfo_2}
                                        disabled={true}
                                        row={row}
                                        activeQuestionIndex={activeQuestionIndex}
                                        column={column}
                                        selectedValue={(value) => {
                                            console.log(value, '---++++++++-----')
                                            setSelectedValueMatrix(value)
                                        }}
                                        ref={childRef}
                                        value={selectedValueMatrix}
                                        resetCheckMatrix={resetCheckMatrix}
                                        init={selectedValueMatrix}
                                    // key={checkboxes}
                                    // checkboxes={checkboxes}
                                    // onPressUpdateState={onPressUpdateState}
                                    />
                        }

                        <ExamEvaluationBottomSection
                            setValue={(val) => {
                                console.warn(val)
                                setChecked(val)
                            }}
                            value={checked}
                            nextQuestion={() => goToNext(question.questionTypeCode, false)}
                            goToPrevious={() => goToPrevious(question.questionTypeCode)}
                            goToHome={() => {
                                setVisible(true);
                                navigation.navigate('Home')
                            }}
                        />
                    </View>
                </View>
                {/* </View > */}
            </ScrollContainer>
            {
                bottomSheetVisible && (
                    <Pressable
                        onPressIn={() => {
                            setBottomSheetVisible(!bottomSheetVisible);
                        }}
                        onPress={() => { }}
                        style={styles.modalStyle}>
                        <ProgressModal
                            answersArray={answersArr}
                            questionsCount={Array.from({ length: totalCount }, (_, i) => i + 1)}
                            modalVisible={bottomSheetVisible}
                            setModalVisibility={() => {
                                setBottomSheetVisible(!bottomSheetVisible);
                            }}
                            cancelAction={(item) => {
                                setBottomSheetVisible(!bottomSheetVisible);
                            }}
                            goToQuestion={(item) => {
                                goToQuestion(item)
                                setBottomSheetVisible(!bottomSheetVisible);
                            }}
                        />
                    </Pressable>
                )
            }

            {/* {
                submitSheetVisible && (
                    <Pressable
                        onPressIn={() => {
                            setSubmitSheetVisible(!submitSheetVisible);
                        }}
                        onPress={() => { }}
                        style={styles.modalStyle}>
                        <SubmitTestModal
                            desc={`Total Marks obtained = ${totalMarks}`}
                            modalVisible={submitSheetVisible}
                            setModalVisibility={() => {
                                setSubmitSheetVisible(!submitSheetVisible);
                            }}
                            cancelAction={() => {
                                setSubmitSheetVisible(!submitSheetVisible);
                            }}
                        />
                    </Pressable>
                )
            } */}
        </View>
    );
}
