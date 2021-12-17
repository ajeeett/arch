import React, { useState, useEffect, useRef } from 'react';
import { get } from 'lodash';
import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    Keyboard,
    Alert,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Pressable,
    FlatList,
    Dimensions,
} from 'react-native';
import styles from './styles';
import Header from "../../../globalComponents/Header/index";
import OnlineExamTopSection from '../../../globalComponents/OnlineExamTopSection/index';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { colors } from '../../../utils/config/colors';
import CoursesCard from '../../../globalComponents/CoursesCard';
import CardTests from '../../../globalComponents/CardTests';
import NewsCard from '../../../globalComponents/NewsCard';
import CustomButton from '../../../globalComponents/CustomButton';
import CustomText from '../../../globalComponents/CustomText';
import CheckBoxSection from '../../../globalComponents/CheckBoxSection';
import RadioButtonSection from '../../../globalComponents/RadioButtonSection';
import ExamBottomSection from '../../../globalComponents/ExamBottomSection';
import ExamInstructionHead from '../../../globalComponents/ExamInstructionHead';
import ProgressModal from './modal/ProgressModal';
import SubmitTestModal from './modal/SubmitTestModal';
import { height, width } from '../../../utils/config/theme';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Checkbox } from 'react-native-paper';
// import questList from './questions/questions1.json'
import { fetchImageFromUrl, showSnackBar } from '../../../utils/Helper/helper';
import { CheckBoxGroup } from '../../../globalComponents/CheckBoxGroup';
import IntegerInputBox from '../../../globalComponents/IntegerInputBox';
import CheckBoxMatrix from '../../../globalComponents/CheckboxMatrix/index';
import { isTablet } from 'react-native-device-info';
import MarksModal from './modal/MarksModal';
import TopActionSheet from './modal/TopActionSheet';
import I18n from '../../../utils/config/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { clearSubmitAnswers, clearSubmitTestAttendance, submitAnswersDetails, submitTestAttendanceRequest, submitTestAttendanceResponse } from '../../../actions/onlineExamActions';
import Loader from '../../../globalComponents/Loader';
import AutoHeightImage from 'react-native-auto-height-image';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

var tempArr = [];
var initialQuestionsArr = [];
var totalAttempt = 0;

export default function OnlineExamScreen({ navigation, route }) {

    console.log('route.params', route?.params);
    const { questionJson } = route?.params;
    let questList = questionJson;

    const [selectedValueMatrix, setSelectedValueMatrix] = useState('');
    const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
    const otpReducer = useSelector(state => state.otpReducer);

    const testData = [
        { name: 'a' },
        { name: 'b' },
        { name: 'v' },
        { name: 'c' },
    ]
    const dispatch = useDispatch();
    const onlineExamReducer = useSelector(state => state.onlineExamReducer);
    const submitAttendancereducer = useSelector(state => state.studentAttendanceReducer)

    const [loading, setLoading] = useState(false)
    const [stringifiedArr, setStringifiedArr] = useState([])
    const [checked, setChecked] = useState('');
    const [test, setTest] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [marksSheetVisible, setMarksSheetVisible] = useState(false);
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
    const [questionImagePath, setQuestionImagePath] = useState([]);
    const childRef = useRef();

    const [partialMarksString, setPartialMarks] = useState('');
    const [isTopSheetOpened, setTopSheetStatus] = useState(false);
    const actionSheetRef = useRef();

    useEffect(() => {
        if (test) {
            // submitTest()
        }
    }, [test])

    useEffect(() => {
        console.log(stringifiedArr, "--stringifedArray");
    }, [stringifiedArr])

    const getQuestionImages = async () => {
        const value = await AsyncStorage.getItem('@questionPath');
        console.log('value', JSON.parse(value));
        setQuestionImagePath(JSON.parse(value));
    }

    useEffect(() => {
        console.log('question image pathh', questionImagePath);
    }, [questionImagePath]);

    useEffect(() => {
        const totalQues = questList.data.listQuestion.length;
        setTotalCount(totalQues);
        setVisible(false)
        // for (i of range(1, totalQues)) {
        //     var ansObj = {
        //         questionNo: questionNo,
        //         value: selectedValue,
        //         isAnswered: true,
        //         markForReview: markForReview
        //     }
        //     initialQuestionsArr.push(ansObj);
        // }

        getQuestionImages();

        var v = Array.from({ length: totalQues }, (_, i) => i + 1)
        for (var i = 0; i < v.length; i++) {

            var ansObj = {
                questionNo: (i + 1).toString(),
                value: '',
                isAnswered: false,
                markForReview: false,
                isAttempted: false,
                status: false,
                questionCode: '',
                individualMarkForQuestion: ""
            }
            initialQuestionsArr.push(ansObj);
            tempArr.push(ansObj)
        }
        setAnswersArr(initialQuestionsArr)
        // foo.forEach(function (row, index) {
        //     row.row_number = index;
        // });
        console.log(initialQuestionsArr, '--v');

        console.log("question", question);
        setRow(question.addInfo_1);
        setColumn(question.addInfo_2);
        return () => {
            initialQuestionsArr = [];
            tempArr = [];
        }
    }, []);

    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: visible
        });
        return () =>
            parent.setOptions({
                tabBarVisible: true
            });
    }, [visible]);

    useEffect(() => {
        partialMark();
    }, [activeQuestionIndex]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () =>
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
    }, [isTopSheetOpened]);

    const handleBackButtonClick = async () => {
        if (isTopSheetOpened) {
            actionSheetRef.current.hideTheActionSheet();
            setTopSheetStatus(false);
        } else {
            showSnackBar("You can't go back from this screen.")
            return true;
        }
    };

    const partialMark = () => {
        if (questions[activeQuestionIndex]?.partialMark?.length > 0) {
            var partialMarks =
                questions[activeQuestionIndex]?.partialMark.split(':');
            var marksString = '';
            var index = 1;
            partialMarks.forEach(element => {
                console.log(element);
                if (index == 1) {
                    marksString += ` - \n1. If only 1 answer is correct, then ${element} mark will be awarded`
                } else if (index == 2) {
                    marksString += `\n2. If 2 answers are correct, then ${element} marks will be awarded`
                } else if (index == 3 && partialMarks.length == 3) {
                    marksString += `\n3. If 3 answers are correct, then ${element} marks will be awarded`
                } else {
                    marksString +=
                        (index == 3
                            ? '\n3. If all answers are correct, then '
                            : '\n4. If all answers are correct, then ') +
                        `${element} marks will be awarded`;
                }
                index++;
            });
            setPartialMarks(marksString + '\n');
        } else {
            setPartialMarks('');
        }
    };

    const renderItem = ({ item, index }) => {

        return (
            <View style={{ width: width, alignItems: 'center' }}>
                <Image style={{ flex: 1, width: width, }} source={require('./../../../assets/images/bluebgcard.png')} />
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

    const submitTest = () => {
        // navigation.navigate('CourseDetailScreen')

        // setSubmitSheetVisible(true);
        calculateMarks();
    }


    const manualSubmission = (questionNo, questionCode, correctAnswer, question, markForReview) => {
        Alert.alert(
            "",
            "Do you really want to submit the test?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        // console.warn('testSubmitted', answersArr);
                        // calculateMarks();
                        setLoading(true);
                        saveAnswers(questionNo, questionCode, correctAnswer, question, markForReview)
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }

    const saveAnswers = (questionNo, questionCode, correctAnswer, question, markForReview) => {
        var ansObj = {
            questionNo: questionNo,
            value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '',
            isAnswered: true,
            markForReview: markForReview,
            isAttempted: questionCode == "SC" ?
                selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                    selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                        inputValue.length > 0 ? true : false : questionCode == "MT" ?
                            selectedValueMatrix.length > 0 ? true : false : false,
            status: false,
            questionCode: questionCode

        }
        console.log(ansObj, '----answobj');

        initialQuestionsArr = initialQuestionsArr.map(u => u.questionNo != ansObj.questionNo ? u : ansObj);
        console.log(' Save anser users -> ', initialQuestionsArr);
        setAnswersArr(initialQuestionsArr);
        console.log(questionCode, '---dd');
        var choice = questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '';
        console.log('selected anser', choice);
        console.log(calculateIndividualMarks(choice, correctAnswer, questionCode, question));
        let individualMark = calculateIndividualMarks(choice, correctAnswer, questionCode, question)

        var ansObjStr = {
            questionNo: questionNo,
            value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '',
            isAnswered: true,
            markForReview: markForReview,
            isAttempted: questionCode == "SC" ?
                selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                    selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                        inputValue.length > 0 ? true : false : questionCode == "MT" ?
                            selectedValueMatrix.length > 0 ? true : false : false,
            status: false,
            questionCode: questionCode,
            individualMarkForQuestion: individualMark.toString()
        }
        console.log(ansObjStr, '----answobj');

        tempArr = tempArr.map(u => u.questionNo != ansObjStr.questionNo ? u : ansObjStr);
        console.log('userstempArr -> ', tempArr);
        setStringifiedArr(tempArr);
        calculateMarks1(tempArr);
    }

    const calculateMarks1 = (tempArr) => {
        setLoading(true);

        console.log(tempArr, '---final Answers');
        var tempAnswers = tempArr;
        var marksTotal = 0;
        var totalMarksObtained = 0;
        for (let index = 0; index < tempAnswers.length; index++) {
            if (tempAnswers[index].isAttempted) totalAttempt++;
            var questionCodeAnswer = tempAnswers[index].questionCode;
            if (questionCodeAnswer == "SC") {
                console.log(questions[index], '-------questions[index]');
                console.log(tempAnswers[index].value, '-------tempAnswers[index].value');
                console.log(questions[index].answer, '-------questions[index].Answer');
                console.log(questions[index].marks, '-------questions[index].Marks');
                console.log(questions[index].negativeMarks, '-------questions[index].NegativeMarks');
                console.log(chosenAnswer == questions[index].answer, '-------chosenAnswer == questions[index].Answer');
                var chosenAnswer = tempAnswers[index].value;
                var correctAnswer = questions[index].answer;
                if (chosenAnswer.toUpperCase().length == 0) {

                } else if (chosenAnswer.toUpperCase().length > 0 && chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                } else {
                    console.log('2###');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }

            } else if (questionCodeAnswer == "MC") {
                var chosenAnswerString = Array.isArray(tempAnswers[index].value) ? tempAnswers[index].value.join(',') : tempAnswers[index].value;
                var correctAnswerString = questions[index].answer;

                console.log(chosenAnswerString, '---chosenAnswerString');
                console.log(correctAnswerString, '---correctAnswerString');
                // var correctAnswerArray = Array.from(correctAnswerString);

                // console.log(correctAnswerArray, '----correct AnswerArray');

                var chosenAnswerArray = chosenAnswerString.split(",");
                console.log(chosenAnswerArray, '---chosenAnswerArray');

                var splittedVals = questions[index].partialMark.split(":");
                console.log(splittedVals, '---splittedVals');

                if (chosenAnswerString.toUpperCase().length == 0) {

                }
                // exact same answer 
                else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                    && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                }

                //  length of answer is same or more and is not exact same (all selectons case included)
                else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
                ) {
                    console.log('length same but wrong');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
                // length of chosen is less now partial calculation will occur
                else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {

                    // getting total number of same items in two strings excluding ','.
                    var identicalCount = getIdenticalCount(chosenAnswerString.toUpperCase(), correctAnswerString.toUpperCase())
                    console.log(identicalCount, '---total Ident');
                    if (identicalCount > 0) {
                        var partialMarkObtained = splittedVals[identicalCount - 1];

                        marksTotal = totalMarksObtained + Number(partialMarkObtained);
                        totalMarksObtained = marksTotal;
                    } else {
                        // if nothing is same negative mark
                        marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                        totalMarksObtained = marksTotal;
                    }

                }
                else {
                    console.log('2###');
                    // marksTotal = totalMarksObtained - Number(questions[index].NegativeMarks);
                    // totalMarksObtained = marksTotal;
                }

            } else if (questionCodeAnswer == "IN") {
                var chosenAnswer = tempAnswers[index].value;
                var correctAnswer = questions[index].answer;
                console.log(chosenAnswer, '---chosenAnswer');
                console.log(correctAnswer, '---correctAnswer');

                if (chosenAnswer.toUpperCase().length == 0) {

                }
                else if (chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                } else {
                    console.log('2###');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
            } else if (questionCodeAnswer == "MT") {
                let chosenAnswerString = tempAnswers[index].value;
                let correctAnswerString = questions[index].answer;
                console.log(chosenAnswerString, '---chosenAnswerString');
                console.log(correctAnswerString, '---correctAnswerString');
                let splittedVals = questions[index].partialMark.split(":");
                console.log(splittedVals, '---splittedVals');
                // exact same answer

                if (chosenAnswerString.toUpperCase().length == 0) {

                }
                else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                    && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                }
                //  length of answer is same or more and is not exact same (all selectons case included)
                else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
                ) {
                    console.log('length same but wrong');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
                // length of chosen is less now partial calculation will occur
                else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {
                    let alphabet = [];
                    let count = 0;
                    let splitAnswer = correctAnswerString.split(';');
                    console.log('Split answer', splitAnswer);
                    let splitMockAnswer = chosenAnswerString.split(';');
                    console.log('Split mock answer', splitMockAnswer);
                    for (let i = 0; i < splitAnswer.length; i++)
                        alphabet.push(splitAnswer[i][0]);
                    for (let i = 0; i < splitMockAnswer.length; i++) {
                        let index = alphabet.indexOf(splitMockAnswer[i][0])
                        if (splitMockAnswer[i] === splitAnswer[index]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        marksTotal = totalMarksObtained + Number(splittedVals[count - 1]);
                        totalMarksObtained = marksTotal;
                    }
                }
            } else {

            }

            setTotalMarks(totalMarksObtained);

            // console.log('final vals', element);
            console.log(marksTotal, '----final Total marks after submit');
            console.log(questList, '----all');



        }
        console.log('total attempted', totalAttempt);

        var studentName = otpReducer?.loginData?.data?.studentDetail?.name
        var studentId = otpReducer?.loginData?.data?.studentDetail?.studentId
        console.log(studentName, '--studnetName');
        console.log(studentId, '--studentId');
        var finalJson = {
            studentName: studentName,
            entryWindowTime: questList.data.entryWindowTime,
            totalScoreObtained: totalMarksObtained,
            graceTime: questList.data.graceTime,
            paperDuration: questList.data.paperDuration,
            paperInstruction: questList.data.paperInstruction,
            responseType: questList.data.responseType,
            testDate: questList.data.testDate,
            testMM: questList.data.testMM,
            testTitle: questList.data.testTitle,
            totalQuestion: questList.data.totalQuestion,
            testCode: questList.data.testCode,
            paperId: questList.data.paperID,
            startTime: "startTime",
            endTime: "endTime",
            studentCode: "studentCODE",
            batchCode: "batchCODE",
            studentId: studentId,
            answers: tempArr,
        }

        hitSubmitAnswersApi(finalJson);

        console.log(finalJson, '----finalJson');
    }

    const calculateMarks = () => {
        setLoading(true);

        console.log(tempArr, '---final Answers');
        console.log(stringifiedArr, '---stringifyed Answers');
        var tempAnswers = tempArr;
        var marksTotal = 0;
        var totalMarksObtained = 0;
        for (let index = 0; index < tempAnswers.length; index++) {
            if (tempAnswers[index].isAttempted) totalAttempt++;

            var questionCodeAnswer = tempAnswers[index].questionCode;
            if (questionCodeAnswer == "SC") {
                console.log(questions[index], '-------questions[index]');
                console.log(tempAnswers[index].value, '-------tempAnswers[index].value');
                console.log(questions[index].answer, '-------questions[index].Answer');
                console.log(questions[index].marks, '-------questions[index].Marks');
                console.log(questions[index].negativeMarks, '-------questions[index].NegativeMarks');
                console.log(chosenAnswer == questions[index].answer, '-------chosenAnswer == questions[index].Answer');
                var chosenAnswer = tempAnswers[index].value;
                var correctAnswer = questions[index].answer;
                if (chosenAnswer.toUpperCase().length == 0) {

                } else if (chosenAnswer.toUpperCase().length > 0 && chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                } else {
                    console.log('2###');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }

            } else if (questionCodeAnswer == "MC") {
                var chosenAnswerString = Array.isArray(tempAnswers[index].value) ? tempAnswers[index].value.join(',') : tempAnswers[index].value;
                var correctAnswerString = questions[index].answer;

                console.log(chosenAnswerString, '---chosenAnswerString');
                console.log(correctAnswerString, '---correctAnswerString');
                // var correctAnswerArray = Array.from(correctAnswerString);

                // console.log(correctAnswerArray, '----correct AnswerArray');

                var chosenAnswerArray = chosenAnswerString.split(",");
                console.log(chosenAnswerArray, '---chosenAnswerArray');

                var splittedVals = questions[index].partialMark.split(":");
                console.log(splittedVals, '---splittedVals');

                if (chosenAnswerString.toUpperCase().length == 0) {

                }
                // exact same answer 
                else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                    && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                }

                //  length of answer is same or more and is not exact same (all selectons case included)
                else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
                ) {
                    console.log('length same but wrong');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
                // length of chosen is less now partial calculation will occur
                else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {

                    // getting total number of same items in two strings excluding ','.
                    var identicalCount = getIdenticalCount(chosenAnswerString.toUpperCase(), correctAnswerString.toUpperCase())
                    console.log(identicalCount, '---total Ident');
                    if (identicalCount > 0) {
                        var partialMarkObtained = splittedVals[identicalCount - 1];

                        marksTotal = totalMarksObtained + Number(partialMarkObtained);
                        totalMarksObtained = marksTotal;
                    } else {
                        // if nothing is same negative mark
                        marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                        totalMarksObtained = marksTotal;
                    }

                }
                else {
                    console.log('2###');
                    // marksTotal = totalMarksObtained - Number(questions[index].NegativeMarks);
                    // totalMarksObtained = marksTotal;
                }

            } else if (questionCodeAnswer == "IN") {
                var chosenAnswer = tempAnswers[index].value;
                var correctAnswer = questions[index].answer;
                console.log(chosenAnswer, '---chosenAnswer');
                console.log(correctAnswer, '---correctAnswer');

                if (chosenAnswer.toUpperCase().length == 0) {

                }
                else if (chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                } else {
                    console.log('2###');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
            } else if (questionCodeAnswer == "MT") {
                let chosenAnswerString = tempAnswers[index].value;
                let correctAnswerString = questions[index].answer;
                console.log(chosenAnswerString, '---chosenAnswerString');
                console.log(correctAnswerString, '---correctAnswerString');
                let splittedVals = questions[index].partialMark.split(":");
                console.log(splittedVals, '---splittedVals');
                // exact same answer

                if (chosenAnswerString.toUpperCase().length == 0) {

                }
                else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                    && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                    console.log('1###');
                    marksTotal = totalMarksObtained + Number(questions[index].marks);
                    totalMarksObtained = marksTotal;
                }
                //  length of answer is same or more and is not exact same (all selectons case included)
                else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
                ) {
                    console.log('length same but wrong');
                    marksTotal = totalMarksObtained - Number(questions[index].negativeMarks);
                    totalMarksObtained = marksTotal;
                }
                // length of chosen is less now partial calculation will occur
                else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                    chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {
                    let alphabet = [];
                    let count = 0;
                    let splitAnswer = correctAnswerString.split(';');
                    console.log('Split answer', splitAnswer);
                    let splitMockAnswer = chosenAnswerString.split(';');
                    console.log('Split mock answer', splitMockAnswer);
                    for (let i = 0; i < splitAnswer.length; i++)
                        alphabet.push(splitAnswer[i][0]);
                    for (let i = 0; i < splitMockAnswer.length; i++) {
                        let index = alphabet.indexOf(splitMockAnswer[i][0])
                        if (splitMockAnswer[i] === splitAnswer[index]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        marksTotal = totalMarksObtained + Number(splittedVals[count - 1]);
                        totalMarksObtained = marksTotal;
                    }
                }
            } else {

            }

            setTotalMarks(totalMarksObtained);

            // console.log('final vals', element);
            console.log(marksTotal, '----final Total marks after submit');
            console.log(questList, '----all');
            console.log(totalAttempt, '----total attempt');
        }

        var studentName = otpReducer?.loginData?.data?.studentDetail?.name
        var studentId = otpReducer?.loginData?.data?.studentDetail?.studentId
        console.log(studentName, '--studnetName');
        console.log(studentId, '--studentId');
        var finalJson = {
            studentName: studentName,
            entryWindowTime: questList.data.entryWindowTime,
            totalScoreObtained: totalMarksObtained,
            graceTime: questList.data.graceTime,
            paperDuration: questList.data.paperDuration,
            paperInstruction: questList.data.paperInstruction,
            responseType: questList.data.responseType,
            testDate: questList.data.testDate,
            testMM: questList.data.testMM,
            testTitle: questList.data.testTitle,
            totalQuestion: questList.data.totalQuestion,
            testCode: questList.data.testCode,
            paperId: questList.data.paperID,
            startTime: "startTime",
            endTime: "endTime",
            studentCode: "studentCODE",
            batchCode: "batchCODE",
            studentId: studentId,
            answers: tempArr,
        }

        hitSubmitAnswersApi(finalJson);

        console.log(finalJson, '----finalJson');
    }

    const hitSubmitAnswersApi = async (finalJson) => {
        setLoading(true);
        let payload = {
            "AnswerInput": finalJson
        }
        await dispatch(submitAnswersDetails(payload))
    }

    const calculateIndividualMarks = (chosenAnswer, correctAnswer, questionCodeAnswer, questions) => {
        console.log("chosenAnswer", chosenAnswer);
        console.log("correctAnswer", correctAnswer);
        var marksTotal = 0;
        if (questionCodeAnswer == "SC") {
            // var chosenAnswer = tempAnswers[index].value;
            // var correctAnswer = questions[index].answer;
            if (chosenAnswer.toUpperCase().length == 0) {

            } else if (chosenAnswer.toUpperCase().length > 0 && chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                console.log('1###');
                marksTotal = "+" + Number(questions.marks);
            } else {
                console.log('2###');
                marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
            }

        } else if (questionCodeAnswer == "MC") {
            var chosenAnswerString = chosenAnswer
            //Array.isArray(tempAnswers[index].value) ? tempAnswers[index].value.join(',') : tempAnswers[index].value;
            var correctAnswerString = correctAnswer
            //questions.answer;

            console.log(chosenAnswerString, '---chosenAnswerString');
            console.log(correctAnswerString, '---correctAnswerString');
            // var correctAnswerArray = Array.from(correctAnswerString);

            // console.log(correctAnswerArray, '----correct AnswerArray');

            var chosenAnswerArray = chosenAnswerString.split(",");
            console.log(chosenAnswerArray, '---chosenAnswerArray');

            var splittedVals = questions.partialMark.split(":");
            console.log(splittedVals, '---splittedVals');

            if (chosenAnswerString.toUpperCase().length == 0) {

            }
            // exact same answer 
            else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                console.log('1###');
                marksTotal = "+" + Number(questions.marks);
            }

            //  length of answer is same or more and is not exact same (all selectons case included)
            else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
            ) {
                console.log('length same but wrong');
                marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
            }
            // length of chosen is less now partial calculation will occur
            else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {

                // getting total number of same items in two strings excluding ','.
                var identicalCount = getIdenticalCount(chosenAnswerString.toUpperCase(), correctAnswerString.toUpperCase())
                console.log(identicalCount, '---total Ident');
                if (identicalCount > 0) {
                    var partialMarkObtained = splittedVals[identicalCount - 1];

                    marksTotal = "+" + Number(partialMarkObtained);
                } else {
                    // if nothing is same negative mark
                    marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
                }

            }
            else {
                console.log('2###');
                // marksTotal = totalMarksObtained - Number(questions[index].NegativeMarks);
                // totalMarksObtained = marksTotal;
            }

        } else if (questionCodeAnswer == "IN") {
            // var chosenAnswer = tempAnswers[index].value;
            // var correctAnswer = questions[index].answer;
            console.log(chosenAnswer, '---chosenAnswer');
            console.log(correctAnswer, '---correctAnswer');

            if (chosenAnswer.toUpperCase().length == 0) {

            }
            else if (chosenAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                console.log('1###');
                marksTotal = "+" + Number(questions.marks);
            } else {
                console.log('2###');
                marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
            }
        } else if (questionCodeAnswer == "MT") {
            // let chosenAnswerString = tempAnswers[index].value;
            // let correctAnswerString = questions[index].answer;
            var chosenAnswerString = chosenAnswer
            var correctAnswerString = correctAnswer
            console.log(chosenAnswerString, '---chosenAnswerString');
            console.log(correctAnswerString, '---correctAnswerString');
            let splittedVals = questions.partialMark.length > 0 ? 0 : questions.partialMark.split(":");
            console.log(splittedVals, '---splittedVals');
            // exact same answer

            if (chosenAnswerString.toUpperCase().length == 0) {

            }
            else if (chosenAnswerString.toUpperCase().length == correctAnswerString.toUpperCase().length
                && chosenAnswerString.toUpperCase() == correctAnswerString.toUpperCase()) {
                console.log('1###');
                marksTotal = "+" + Number(questions.marks);
            }
            //  length of answer is same or more and is not exact same (all selectons case included)
            else if (chosenAnswerString.toUpperCase().length >= correctAnswerString.toUpperCase().length &&
                chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()
            ) {
                console.log('length same but wrong');
                marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
            }
            // length of chosen is less now partial calculation will occur
            else if (chosenAnswerString.toUpperCase().length < correctAnswerString.toUpperCase().length &&
                chosenAnswerString.toUpperCase() != correctAnswerString.toUpperCase()) {
                if (splittedVals != 0) {
                    let alphabet = [];
                    let count = 0;
                    let splitAnswer = correctAnswerString.split(';');
                    console.log('Split answer', splitAnswer);
                    let splitMockAnswer = chosenAnswerString.split(';');
                    console.log('Split mock answer', splitMockAnswer);
                    for (let i = 0; i < splitAnswer.length; i++)
                        alphabet.push(splitAnswer[i][0]);
                    for (let i = 0; i < splitMockAnswer.length; i++) {
                        let index = alphabet.indexOf(splitMockAnswer[i][0])
                        if (splitMockAnswer[i] === splitAnswer[index]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        marksTotal = "+" + Number(splittedVals[count - 1]);
                    }
                } else {
                    marksTotal = questions.negativeMarks == 0 ? 0 : -Number(questions.negativeMarks);
                }
            }
        } else {

        }
        console.log('individual mark', marksTotal);
        return marksTotal;
    }

    useEffect(() => {
        if (submitAttendancereducer?.dataFetched) {
            setSubmitSheetVisible(true);
            setLoading(false);
            dispatch(clearSubmitTestAttendance());
        } else if (submitAttendancereducer?.error) {
            showSnackBar(submitAttendancereducer?.error);
            dispatch(clearSubmitTestAttendance());
        }
    }, [submitAttendancereducer])

    useEffect(() => {

        if (onlineExamReducer?.answersSubmitted) {
            console.log(onlineExamReducer, '--?? online exam reducer');
            //   setStatsData(onlineExamReducer?.stats?.data)

            // setSubmitSheetVisible(true);
            // Call the API Attendance - not yet called
            const { testId, testType } = route?.params;
            let payload = {
                TestId: Number(testId),
                TestType: testType
            }
            dispatch(submitTestAttendanceRequest(payload));

            setLoading(false);
            dispatch(clearSubmitAnswers());
        } else if (onlineExamReducer?.error) {
            setLoading(false);
            if (onlineExamReducer?.error == 'Network Error') {
                retrySubmit();
                // return;
            }
            showSnackBar(onlineExamReducer?.error);
            dispatch(clearSubmitAnswers());
        }
    }, [onlineExamReducer]);

    const retrySubmit = () => {
        Alert.alert(
            "Internet Connection Error",
            "Oops! You are not connected to the internet. Please try again.",
            [
                {
                    text: "Retry",
                    onPress: () => {
                        calculateMarks();
                    },
                }
            ]
        );
    }

    function getIdenticalCount(str1, str2) {
        let count = 0;

        for (let ch of str1) {
            if (str2.includes(ch) && ch != ',') {
                count++;
            }
        }

        return count;
    }

    // useEffect(() => {
    //     if (correctCount != 0) {


    //         setTimeout(() => {
    //             setChecked(false)
    //             nextQuestion()
    //         }, 2000);
    //     }
    // }, [correctCount])

    const answer = (selectedOption, correctAnswer) => {
        // setAnswered(true);
        // if (selectedOption == correctAnswer) {
        //     var count = correctCount + 1;
        //     setCorrectCount(count);
        //     // nextState.answerCorrect = true;
        // } else {
        //     // nextState.answerCorrect = false;
        // }
    }

    const nextQuestion = () => {

        // setRow(question.AddInfo_1);
        // setColumn(question.AddInfo_2);
        var activeIndex = activeQuestionIndex + 1;
        if (activeIndex >= totalCount) {
            // alert(correctCount)
            console.log('finished');
            // console.warn(answersArr, '--finarr');
            return;
        } else {
            setActiveQuestionIndex(activeIndex);
            setAnswered(false)
            return;
        }

    };

    useEffect(() => {
        console.log('value change of selected radio', selectedValue);
    }, [selectedValue])


    useEffect(() => {
        console.log('value change of selected checkbox', selectedValue1);
    }, [selectedValue1])

    const saveAndNext = (questionNo, questionCode, correctAnswer, question, markForReview) => {
        console.log(questionNo, '--', questionCode, '--', correctAnswer, '--', markForReview, '---questionData');

        // if (Array.isArray(correctAnswer)) {
        //     var commasep = correctAnswer.join(",");
        //     console.log(commasep, '----commasepcorrect answer');
        //     var commasep1 = selectedValue1.join(",");
        //     console.log(commasep1, '----selectedValue1 commasep answer');
        // }

        // setCounterForCorrectAnswer(questionCode, correctAnswer, question, initialQuestionsArr[activeQuestionIndex], markForReview);


        console.log(selectedValueMatrix, '---selectedValueMatrix');

        var ansObj = {
            questionNo: questionNo,
            value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '',
            isAnswered: true,
            markForReview: markForReview,
            isAttempted: questionCode == "SC" ?
                selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                    selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                        inputValue.length > 0 ? true : false : questionCode == "MT" ?
                            selectedValueMatrix.length > 0 ? true : false : false,
            status: false,
            questionCode: questionCode,

        }
        console.log(ansObj, '----answobj');

        initialQuestionsArr = initialQuestionsArr.map(u => u.questionNo != ansObj.questionNo ? u : ansObj);
        console.log('save and next users -> ', initialQuestionsArr);
        setAnswersArr(initialQuestionsArr);
        console.log(questionCode, '---dd');

        var choice = questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '';
        console.log('selected anser', choice);
        console.log(calculateIndividualMarks(choice, correctAnswer, questionCode, question));
        let individualMark = calculateIndividualMarks(choice, correctAnswer, questionCode, question)

        var ansObjStr = {
            questionNo: questionNo,
            value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? (Number(inputValue) / 1).toString() : questionCode == "MT" ? selectedValueMatrix : '',
            isAnswered: true,
            markForReview: markForReview,
            isAttempted: questionCode == "SC" ?
                selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                    selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                        inputValue.length > 0 ? true : false : questionCode == "MT" ?
                            selectedValueMatrix.length > 0 ? true : false : false,
            status: false,
            questionCode: questionCode,
            individualMarkForQuestion: individualMark.toString()
        }
        console.log(ansObjStr, '----answobj');

        tempArr = tempArr.map(u => u.questionNo != ansObjStr.questionNo ? u : ansObjStr);
        console.log('userstempArr -> ', tempArr);
        setStringifiedArr(tempArr);

        // console.log(initialQuestionsArr[activeQuestionIndex].isAnswered, '---isAnswered');
        // console.log(initialQuestionsArr[activeQuestionIndex], '---isAnswered values');

        // questionCode == "SC" ? setChecked(false) : setCheckSelected([])
        // nextQuestion();
        // questionCode == "SC" ? setSelectedValue('') : setSelectedValue1([])


        // questionCode == "SC" ? setChecked(false) :
        //     questionCode == "IN" ? setInputValue('') :
        //         fromPrevious ? setCheckSelected(Array.isArray(initialQuestionsArr[questionNo].value) ? initialQuestionsArr[questionNo].value : [initialQuestionsArr[questionNo].value])
        //             : setCheckSelected([]);

        // nextQuestion();

        // questionCode == "SC" ? setSelectedValue('') :
        //     questionCode == "IN" ? setInputValue('')
        //         : fromPrevious ? setSelectedValue1(Array.isArray(initialQuestionsArr[questionNo].value) ? initialQuestionsArr[questionNo].value : [initialQuestionsArr[questionNo].value])
        //             : setSelectedValue1([])

        if (activeQuestionIndex + 1 < totalCount) {
            console.log(activeQuestionIndex + 1, '---questionNo');
            console.log(selectedValue, '---selectedValue');
            console.log(selectedValue1, '---selectedValue1');
            console.log(initialQuestionsArr[activeQuestionIndex + 1], '---initialQuestionsArr[questionNo - 1](index as per array local)');
            console.log(initialQuestionsArr[activeQuestionIndex + 1].value, '---initialQuestionsArr[questionNo - 1].value');
            console.log(initialQuestionsArr[activeQuestionIndex + 1].value.length, '---initialQuestionsArr[questionNo - 1].value.length');
            console.log(questionCode, '---initiaquestionCode');
            console.log(questions[activeQuestionIndex + 1].questionTypeCode, '---initiaquestionCode');

            questions[activeQuestionIndex + 1].questionTypeCode == "SC" ? setChecked(initialQuestionsArr[activeQuestionIndex + 1].value ? initialQuestionsArr[activeQuestionIndex + 1].value : '') :
                questions[activeQuestionIndex + 1].questionTypeCode == "IN" ? setInputValue(initialQuestionsArr[activeQuestionIndex + 1].value ? initialQuestionsArr[activeQuestionIndex + 1].value : '') :
                    questions[activeQuestionIndex + 1].questionTypeCode == "MC" ?
                        setCheckSelected(
                            initialQuestionsArr[activeQuestionIndex + 1].value.length > 0 ?
                                Array.isArray(initialQuestionsArr[activeQuestionIndex + 1].value) ?
                                    initialQuestionsArr[activeQuestionIndex + 1].value
                                    : [initialQuestionsArr[activeQuestionIndex + 1].value] :
                                [])
                        : questions[activeQuestionIndex + 1].questionTypeCode == "MT" ?

                            setResetCheckMatrix(initialQuestionsArr[activeQuestionIndex + 1].value.length > 0 ? false : true) :
                            null;

            if (questions[activeQuestionIndex + 1].questionTypeCode == "MT") {
                setRow(questions[activeQuestionIndex + 1].addInfo_1)
                setColumn(questions[activeQuestionIndex + 1].addInfo_2)
            }

            questions[activeQuestionIndex + 1].questionTypeCode == "SC" ? setSelectedValue(initialQuestionsArr[activeQuestionIndex + 1].value ? initialQuestionsArr[activeQuestionIndex + 1].value : '') :
                questions[activeQuestionIndex + 1].questionTypeCode == "IN" ? setInputValue(initialQuestionsArr[activeQuestionIndex + 1].value ? initialQuestionsArr[activeQuestionIndex + 1].value : '')
                    : questions[activeQuestionIndex + 1].questionTypeCode == "MC" ? setSelectedValue1(initialQuestionsArr[activeQuestionIndex + 1].value.length > 0 ?
                        Array.isArray(initialQuestionsArr[activeQuestionIndex + 1].value) ? initialQuestionsArr[activeQuestionIndex + 1].value : [initialQuestionsArr[activeQuestionIndex + 1].value] : [])
                        :
                        questions[activeQuestionIndex + 1].questionTypeCode == "MT" ?
                            setSelectedValueMatrix(initialQuestionsArr[activeQuestionIndex + 1].value.length > 0 ?

                                initialQuestionsArr[activeQuestionIndex + 1].value
                                : '')
                            : null

            // console.warn(totalMarks, '----total Marks');
        }
        else if (activeQuestionIndex + 1 == totalCount) {
            console.warn(answersArr, "----last");
            manualSubmission(questionNo, questionCode, correctAnswer, question, markForReview)
        }
        if (childRef.current != null && activeQuestionIndex + 1 < totalCount)
            childRef.current.resetCheckBoxState();
        nextQuestion();


    }

    const clearSelection = (questionNo, questionCode, markForReview) => {
        var ansObj = {
            questionNo: questionNo,
            value: '',
            isAnswered: false,
            markForReview: markForReview,
            isAttempted: false,
            status: false,
            questionCode: ''
        }

        initialQuestionsArr = initialQuestionsArr.map(u => u.questionNo != ansObj.questionNo ? u : ansObj);
        console.log('clear selection 1 users -> ', initialQuestionsArr);
        // arr.push(ansObj);
        setAnswersArr(initialQuestionsArr);



        var ansObjStr = {
            questionNo: questionNo,
            value: '',
            isAnswered: false,
            markForReview: markForReview,
            isAttempted: false,
            status: false,
            questionCode: ''
        }

        tempArr = tempArr.map(u => u.questionNo != ansObjStr.questionNo ? u : ansObjStr);
        console.log('clear selection 2 users -> ', tempArr);
        setStringifiedArr(initialQuestionsArr)








        // setChecked(false);
        // setSelectedValue('');
        setAnswered(false);
        questionCode == "SC" ? setChecked('') :
            questionCode == "IN" ?
                setInputValue('')
                : questionCode == "MT" ?
                    setResetCheckMatrix(true)
                    : setCheckSelected([])

        questionCode == "SC" ? setSelectedValue('') :
            questionCode == "IN" ?
                setInputValue('')
                : questionCode == "MT" ?
                    setSelectedValueMatrix('')
                    : setSelectedValue1([])

        if (childRef.current != null) childRef.current.resetState()

    }

    const goToPrevious = (questionNo, questionCode, correctAnswer, question, markForReview) => {
        setFromPrevious(true)
        if (activeQuestionIndex > 0) {
            // setChecked(false)
            // setAnswered(false);

            //saving answer
            var ansObj = {
                questionNo: questionNo,
                value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '',
                isAnswered: true,
                markForReview: markForReview,
                isAttempted: questionCode == "SC" ?
                    selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                        selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                            inputValue.length > 0 ? true : false : questionCode == "MT" ?
                                selectedValueMatrix.length > 0 ? true : false : false,
                status: false,
                questionCode: questionCode

            }
            console.log(ansObj, '----answobj');

            initialQuestionsArr = initialQuestionsArr.map(u => u.questionNo != ansObj.questionNo ? u : ansObj);
            console.log('gotoprevious users -> ', initialQuestionsArr);
            setAnswersArr(initialQuestionsArr);
            console.log(questionCode, '---dd');

            var choice = questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '';
            console.log('selected anser', choice);
            console.log(calculateIndividualMarks(choice, correctAnswer, questionCode, question));
            let individualMark = calculateIndividualMarks(choice, correctAnswer, questionCode, question)

            var ansObjStr = {
                questionNo: questionNo,
                value: questionCode == "SC" ? selectedValue : questionCode == "MC" ? Array.isArray(selectedValue1) ? selectedValue1.join(",") : selectedValue1 : questionCode == "IN" ? inputValue : questionCode == "MT" ? selectedValueMatrix : '',
                isAnswered: true,
                markForReview: markForReview,
                isAttempted: questionCode == "SC" ?
                    selectedValue.length > 0 ? true : false : questionCode == "MC" ?
                        selectedValue1.length > 0 ? true : false : questionCode == "IN" ?
                            inputValue.length > 0 ? true : false : questionCode == "MT" ?
                                selectedValueMatrix.length > 0 ? true : false : false,
                status: false,
                questionCode: questionCode,
                individualMarkForQuestion: individualMark.toString()
            }
            console.log(ansObjStr, '----answobj');

            tempArr = tempArr.map(u => u.questionNo != ansObjStr.questionNo ? u : ansObjStr);
            console.log('userstempArr -> ', tempArr);
            setStringifiedArr(tempArr);

            // going to previous

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

    const questionInstruction = (type) => {
        switch (type) {
            case 'SC': return I18n.t('online_test.only_one');
            case 'MC': return I18n.t('online_test.MC_option');
            default: return I18n.t('online_test.only_one');
        }
    }

    const TextRegular = ({ child }) => (
        <Text style={styles.instructionsText}>{child}</Text>
    )

    const TextBold = ({ child }) => (
        <Text style={styles.instructionsTextBold}>{child}</Text>
    )

    const TopSheetContent = () => (
        <>
            <CustomText
                content={<>
                    {
                        questions[activeQuestionIndex]?.questionTypeCode != 'IN' ?
                            <>
                                {questions[activeQuestionIndex]?.questionTypeCode != 'MT' ? <>
                                    <TextRegular child={I18n.t('online_test.question_instruction')} />
                                    <TextBold child={questionInstruction(questions[activeQuestionIndex]?.questionTypeCode)} />
                                    <TextRegular child={' ' + I18n.t('online_test.is_correct')} />
                                    <TextRegular child={'\n\n' + I18n.t('online_test.choose_option')} />
                                </> : <>
                                    <TextRegular child={I18n.t('online_test.MT_option1')} />
                                    <TextBold child={'MULTIPLE CORRECT OPTIONS'} />
                                    <TextRegular child={I18n.t('online_test.MT_option2')} />
                                </>
                                }
                            </> :
                            <>
                                <TextRegular child={I18n.t('online_test.IN_number1')} />
                                <TextRegular child={I18n.t('online_test.IN_number2')} />
                                <TextBold child={I18n.t('online_test.IN_number3')} />
                                <TextRegular child={I18n.t('online_test.IN_number4')} />
                            </>
                    }
                </>}
            />

            < CustomText
                content={
                    <>
                        <TextRegular child={'\n' + I18n.t('online_test.correct_answer_marking')} />
                        {partialMarksString.length > 0 ?
                            <TextRegular child={partialMarksString} /> :
                            <TextRegular child={" " + questions[activeQuestionIndex]?.marks + ' ' + "marks.\n"} />
                        }
                    </>
                } />

            <CustomText
                content={
                    <>
                        <TextRegular child={I18n.t('online_test.wrong_answer_marking')} />
                        <TextRegular child={questions[activeQuestionIndex]?.negativeMarks} />
                        <TextRegular child={questions[activeQuestionIndex]?.negativeMarks > 1 ? ' marks.' : ' mark.'} />
                        <TextRegular child={'\n' + I18n.t('online_test.unattemped_marking')} />
                    </>
                }
            />
        </>
    );

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

                    {console.log(questList.data, '----questList.data.paperDuration')}
                    <ExamInstructionHead
                        showProgress={() => {
                            setBottomSheetVisible(true)
                        }}
                        showMarking
                        over={() => {
                            // saveAnswers(question.questionNo, question.questionTypeCode, question.answer, question, false)
                            calculateMarks();
                            showSnackBar("You ran out of time. Auto-submitting your answers...")
                            // Alert.alert(
                            //     "",
                            //     "You ran out of time. Auto-submitting your answers...",
                            //     [
                            //         {
                            //             text: "Ok",
                            //             onPress: () => {
                            //                 console.log('answesarr', answersArr)
                            //                 setTest(true)
                            //             },
                            //         },

                            //     ]
                            // );
                        }

                        }
                        positiveMarkCount={questions[activeQuestionIndex]?.marks}
                        negativeMarkCount={questions[activeQuestionIndex]?.negativeMarks}
                        partialMarkCount={questions[activeQuestionIndex]?.partialMark}
                        timer={(questList.data.paperDuration) * 60000}
                        openMarkingInfo={() => {
                            // setMarksSheetVisible(true)
                            actionSheetRef.current.bringUpActionSheet();
                        }}
                        // timer={1 * 10000}
                        heading={`${questions[activeQuestionIndex].subjectTitle} • ${questions[activeQuestionIndex].chapterTitle}`}

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

                                    source={{ uri: question.mobileQuestionPath }}
                                /></View>

                            {/* <Image style={{
                                // flex: 1,
                                borderWidth: 1,
                                borderColor: '#090',
                                width: '100%', height: "75%",
                                alignSelf: 'center',
                            }}
                                resizeMode={'contain'}
                                source={{ uri: question.mobileQuestionPath }} /> */}
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
                        // flex: 1,
                        paddingHorizontal: 20,
                        backgroundColor: colors.lightGray,
                        paddingVertical: 10

                    }}>


                        {/* <CustomText
                                styles={{ fontSize: 20 }}
                                content={totalMarks}
                            /> */}
                        {/* <CustomButton
                                style={styles.signInBtn}
                                title={"Reset"}
                                // handler={resetState}
                                disabled={false}
                            /> */}
                        {question.questionTypeCode == "SC" ?
                            <RadioButtonSection
                                setValue={(selectedOption) => {
                                    // console.warn(selectedOption, '--a')
                                    setChecked(selectedOption);
                                    setSelectedValue(selectedOption);
                                    answer(selectedOption, question.answer)
                                }}
                                value={checked}

                            />
                            :
                            question.questionTypeCode == "IN" ?
                                <IntegerInputBox
                                    placeholder={'Enter your value here'}
                                    keyboardType={'numeric'}
                                    changeTextHandler={(value) => {
                                        const validated = value.match(/^[-]?\d*(?:[.]\d*)?$/)
                                        if (validated) {
                                            setInputValue(value)
                                        }
                                    }}
                                    id="intInput"
                                    value={inputValue}
                                /> :
                                question.questionTypeCode == "MC" ?
                                    <CheckBoxGroup
                                        resetCheck={checkSelected}
                                        selectedData={value => {
                                            console.log(value, '--?############')
                                            setCheckSelected(value)
                                            setSelectedValue1(value);
                                            // var arr = [];
                                            // value.map(item => {
                                            //     if (item.checked == true)
                                            //         arr.push(item.value);
                                            // })
                                            // setSelectedValue1(arr);
                                            // answer(selectedOption, question.Answer)
                                        }}
                                    />
                                    :
                                    <CheckBoxMatrix
                                        // row={question.AddInfo_1}
                                        // column={question.AddInfo_2}
                                        row={row || question.addInfo_1}
                                        activeQuestionIndex={activeQuestionIndex}
                                        column={column || question.addInfo_2}
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

                        <ExamBottomSection
                            setValue={(val) => {
                                console.warn(val)
                                setChecked(val)
                            }}
                            value={checked}
                            submitTest={() => manualSubmission(question.questionNo, question.questionTypeCode, question.answer, question, false)}
                            saveNext={() => saveAndNext(question.questionNo, question.questionTypeCode, question.answer, question, false)}
                            clear={() => clearSelection(question.questionNo, question.questionTypeCode, false)}
                            markForReview={() => saveAndNext(question.questionNo, question.questionTypeCode, question.answer, question, true)}
                            goToPrevious={() => goToPrevious(question.questionNo, question.questionTypeCode, question.answer, question, false)}
                            activeQuestIndex={activeQuestionIndex}
                            totalQuests={totalCount - 1}
                        />

                    </View>




                    <Loader loading={loading} />


                </View >
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

            {
                submitSheetVisible && (
                    <View style={styles.modalStyle}>
                        <SubmitTestModal
                            desc={`Total Marks obtained = ${totalMarks}`}
                            attempt={`Total Question Attempted = ${totalAttempt}`}
                            time={`Test submitted at ${moment().format('DD-MM-YYYY hh:mm A')}`}
                            modalVisible={submitSheetVisible}
                            setModalVisibility={() => {
                                setSubmitSheetVisible(!submitSheetVisible);
                            }}
                            cancelAction={() => {
                                setSubmitSheetVisible(!submitSheetVisible);
                            }}
                            goToHome={() => {
                                setSubmitSheetVisible(false);
                                totalAttempt = 0;
                                navigation.navigate('Home');
                            }}
                            reviewResult={() => {
                                totalAttempt = 0;
                                setSubmitSheetVisible(false);
                                navigation.navigate('OnlineExamEvaluation', {
                                    answersArray: tempArr,
                                    questList: questionJson
                                })
                            }}
                        />
                    </View>
                )
            }

            {
                marksSheetVisible && (
                    <Pressable
                        onPressIn={() => {
                            setMarksSheetVisible(!marksSheetVisible);
                        }}
                        onPress={() => { }}
                        style={styles.modalStyle}>
                        <MarksModal
                            answersArray={answersArr}
                            questionsCount={Array.from({ length: totalCount }, (_, i) => i + 1)}
                            modalVisible={marksSheetVisible}
                            setModalVisibility={() => {
                                setMarksSheetVisible(!marksSheetVisible);
                            }}
                            cancelAction={(item) => {
                                setMarksSheetVisible(!marksSheetVisible);
                            }}
                            htmlContent={questions[activeQuestionIndex]?.marks}
                        />
                    </Pressable>
                )
            }

            <TopActionSheet
                child={
                    <View
                        style={{
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TopSheetContent />
                        </ScrollView>
                    </View>
                }
                onOpenSheet={() => {
                    setTopSheetStatus(true);
                }}
                onHideSheet={() => {
                    setTopSheetStatus(false);
                }}
                ref={actionSheetRef} />

        </View>

    );
}
