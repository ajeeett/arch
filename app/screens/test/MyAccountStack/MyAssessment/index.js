import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, Pressable, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from "lodash"
import styles from './styles';
import Header from '../../../globalComponents/Header/index';
import I18n from '../../../utils/config/I18n';
import UpcomingLiveClassZeroState from '../../../globalComponents/UpcomingLiveClassZeroState';
import { getAttemptDetailsClear, getAttemptDetailsRequest, getAttemptListClear, getAttemptListRequest, getPaperAttemptsClear, getPaperAttemptsRequest } from '../../../actions/myAssessmentAction';
import Loader from '../../../globalComponents/Loader';
import { showSnackBar } from '../../../utils/Helper/helper';
import CustomText from '../../../globalComponents/CustomText';
import { fetchTestDetails } from '../../../actions/onlineExamActions';
import moment from 'moment';

export default function MyAssessment({ navigation }) {
  const dispatch = useDispatch();
  const myAssessmentResponse = useSelector(state => state.myAssessmentReducer);
  const attemptListResponse = useSelector(state => get(state, 'myAssessmentReducer.attemptListFetchSuccess', false))
  const paperAttemptsResponse = useSelector(state => get(state, 'myAssessmentReducer.paperAttemptFetchSuccess', false))
  // const attemptDetailsResponse = useSelector(state => get(state, 'myAssessmentReducer.attemptDetailsFetchSuccess', false))
  const testsListReducer = useSelector(state => state.onlineExamReducer);

  const [loading, setLoading] = useState(false);
  const [attemptList, setAttemptList] = useState([]);
  const [paperAttempt, setPaperAttempt] = useState([]);
  // const [attemptDetails, setAttemptDetails] = useState([]);
  const [testId, setTestId] = useState('');
  const [questionsJson, setQuestionsJson] = useState('');
  const [paperId, setPaperId] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
  }, []);

  const handleBackButtonClick = async () => {
    clearData();

    navigation.goBack();
    return true;
  };

  useEffect(() => {
    fetchAssessmentData();

    return () => clearData();
  }, []);

  const clearData = async () => {
    await dispatch(getAttemptListClear());
    await dispatch(getAttemptDetailsClear());
    await dispatch(getPaperAttemptsClear());
  }

  const fetchAssessmentData = async () => {
    await dispatch(getAttemptListRequest());
    setLoading(true);
  };

  useEffect(() => {
    if (myAssessmentResponse?.attemptListFetchSuccess) {
      setAttemptList(myAssessmentResponse?.attemptList?.data);
      dispatch(getAttemptListClear());
      // setLoading(false);
    } else if (myAssessmentResponse?.error) {
      // setLoading(false);
      showSnackBar(myAssessmentResponse?.error)
    }
    setLoading(false);
  }, [attemptListResponse]);

  // paper attempts
  const getPaperAttempts = async (paperID, testID) => {
    var testId = testID;
    setPaperId(paperID)
    setTestId(testId);
    setLoading(true);
  };

  useEffect(() => {
    if (testId != '' && testId != undefined) {
      fetchTestDetailsData(testId);
    }
  }, [testId])


  const fetchTestDetailsData = async () => {
    let payload = {
      "TestId": testId.toString()
    }
    await dispatch(fetchTestDetails(payload));
    setLoading(true);
  };

  useEffect(() => {
    if (testsListReducer?.detailsFetched) {
      setQuestionsJson(testsListReducer?.testDetails?.data);
      setLoading(true);

      let payload = { paperID: paperId };
      dispatch(getPaperAttemptsRequest(payload));
    }
    else if (testsListReducer?.error) {
      setLoading(false);
      showSnackBar(testsListReducer?.error);
    }
  }, [testsListReducer]);

  useEffect(() => {
    if (myAssessmentResponse?.paperAttemptFetchSuccess) {
      setPaperAttempt(myAssessmentResponse?.paperAttempt?.data);
      dispatch(getPaperAttemptsClear());
    } else if (myAssessmentResponse?.error) {
      showSnackBar(myAssessmentResponse?.error)
      dispatch(getPaperAttemptsClear());
    }
    setLoading(false);
  }, [paperAttemptsResponse]);

  useEffect(() => {
    if (!isEmpty(paperAttempt)) {
      navigation.navigate('MyAssessmentAttemptScreen', {
        paperAttempt,
        questionsJson
      });
    }
  }, [paperAttempt,])

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
    return (
      <Pressable onPress={() => getPaperAttempts(item?.paperID, item?.testID)} style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <CustomImageContainer source={require('./../../../assets/images/assessmentIcon.png')} />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <View style0={styles.itemWrapper}>
            <CustomText styles={styles.headerText} content={item?.testTitle} ellipseMode={'tail'} lineNumbers={1} />
            <CustomText styles={styles.contentText} content={moment(item?.testDate).format("DD/MM/YYYY")} ellipseMode={'tail'} lineNumbers={1} />
          </View>
          {item?.totalAttempt != null ? <View style={styles.footerTextView}>
            <CustomText lineNumbers={1} styles={styles.footerText} content={'Total Attempts: ' + item?.totalAttempt} ellipseMode={'tail'} />
          </View> : null}
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
          {attemptList && attemptList.length > 0 ?
            <View style={styles.listItem}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={attemptList}
                renderItem={renderItem}
                keyExtractor={item => item.paperID}
              />
            </View> : <UpcomingLiveClassZeroState
              headImage={require('./../../../assets/images/zeroLiveClassApple.png')}
              heading={I18n.t("myAccount.no_assessment")}
              subHeading={I18n.t("home.please_check_again_after_some_time")}
            />}
        </View>
      </View>
      <Loader loading={loading} />
    </View>
  );
}
