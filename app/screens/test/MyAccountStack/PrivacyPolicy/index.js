import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Loader from '../../../globalComponents/Loader';
import { View } from 'react-native';
import styles from './styles';
import Header from '../../../globalComponents/Header/index';
import HTMLRenderer from '../../../globalComponents/HTMLRenderer';
import I18n from '../../../utils/config/I18n';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import {
  requestPrivacyPolicy,
  clearPrivacyPolicy,
} from '../../../actions/myAccountActions';

export default function PrivacyPolicy({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [privacyContent, setPrivacyContent] = useState('');

  const myAccountReducer = useSelector(state => state.myAccountReducer);

  useFocusEffect(
    useCallback(() => {
      fetchPrivacyPolicyData();
      return () => { }
    }, [])
  );

  const fetchPrivacyPolicyData = async () => {
    setLoading(true);
    await dispatch(requestPrivacyPolicy());
  }

  useEffect(() => {
    setLoading(false);
    if (myAccountReducer?.privacyFetched) {
      setPrivacyContent(myAccountReducer?.privacyPolicy?.data?.pageContent)
    } else if (myAccountReducer?.error) {
      showSnackBar(myAccountReducer?.error);
      dispatch(clearPrivacyPolicy());
    }
  }, [myAccountReducer]);

  return (
    <View style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          navigation.goBack();
        }}
        headerLabel={I18n.t('myAccount.privacy_policy_header')}
      />

      <ScrollContainer>
        {!isEmpty(privacyContent) ? (
          <View style={styles.containerWrapper}>
            <HTMLRenderer html={privacyContent}></HTMLRenderer>
          </View>
        ) : null}
        <Loader loading={loading} />
      </ScrollContainer>
    </View>
  );
}
