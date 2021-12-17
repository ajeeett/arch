import React, { useState, useEffect, useRef } from 'react';
import { get, isEmpty } from 'lodash';
import Loader from '../../../globalComponents/Loader';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import HTMLRenderer from '../../../globalComponents/HTMLRenderer';
import I18n from '../../../utils/config/I18n';
import { WebView } from 'react-native-webview';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import {
  requestPrivacyPolicy,
  clearPrivacyPolicy,
  clearFAQResponse,
  requestFAQ,
} from '../../../actions/myAccountActions';
import { useFocusEffect } from '@react-navigation/core';
import CollasibleComponent from '../../../globalComponents/CollasibleComponent';
import FAQCollapsible from '../../../globalComponents/FAQCollapsible';

export default function HelpSupport({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();

  const myAccountReducer = useSelector(state => state.myAccountReducer);

  const restData = [
    {
      "question": "Question1",
      "answer": "Answer1",
      "answerCollection": [
        "Answer1"
      ]
    },
    {
      "question": "Question2",
      "answer": "Answer2",
      "answerCollection": [
        "Answer2"
      ]
    },
    {
      "question": "Question3",
      "answer": "Answer3",
      "answerCollection": [
        "Answer3"
      ]
    },
    {
      "question": "Question4",
      "answer": "Answer4",
      "answerCollection": [
        "Answer4"
      ]
    },
    {
      "question": "Question5",
      "answer": "Answer5",
      "answerCollection": [
        "Answer5"
      ]
    }
  ]

  useFocusEffect(
    React.useCallback(() => {
      fetchFAQ();
      return () => {

      }
    }, [])
  );
  const fetchFAQ = async () => {
    setLoading(true);
    await dispatch(requestFAQ())
  }

  useEffect(() => {
    setLoading(false);
    if (myAccountReducer?.faqFetched) {
      console.log(myAccountReducer?.faq, '--??');
      setFaqData(myAccountReducer?.faq?.data)
      dispatch(clearFAQResponse());
    } else if (myAccountReducer?.error) {
      showSnackBar(myAccountReducer?.error);
      dispatch(clearFAQResponse());
    }
  }, [myAccountReducer]);

  useEffect(() => {
    console.log('myfaq data', faqData);
  }, [faqData])



  return (
    <View style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          navigation.goBack();
        }}
        headerLabel={I18n.t('myAccount.help_and_support')}
      />

      <ScrollContainer>
        {restData && restData.length > 0 ?
          <FAQCollapsible
            ref={ref}
            currentIndex={currentIndex}
            setCurrentIndex={val => setCurrentIndex(val)}
            data={restData}
            onPress={() => {

            }}

          /> : null}
        {/* <FAQCollapsible
          ref={ref}
          currentIndex={currentIndex}
          setCurrentIndex={val => setCurrentIndex(val)}
          data={restData}
          onPress={() => {

          }}

        /> */}
        <Loader loading={loading} />
      </ScrollContainer>

    </View>
  );
}
