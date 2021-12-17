import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Loader from '../../../globalComponents/Loader';
import Header from '../../../globalComponents/Header/index';
import HTMLRenderer from '../../../globalComponents/HTMLRenderer';
import I18n from '../../../utils/config/I18n';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import {
  requestTermsAndCondition,
  clearTermsAndCondition,
} from '../../../actions/myAccountActions';

export default function TermsConditions({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  const myAccountReducer = useSelector(state => state.myAccountReducer);

  useFocusEffect(
    useCallback(() => {
      fetchTermsData();
      return () => { }
    }, [])
  );

  const fetchTermsData = async () => {
    setLoading(true);
    await dispatch(requestTermsAndCondition());
  }

  useEffect(() => {
    setLoading(false);
    if (myAccountReducer?.termsFetched) {
      setTermsData(myAccountReducer?.termsAndCondition?.data?.pageContent)
    } else if (myAccountReducer?.error) {
      showSnackBar(myAccountReducer?.error);
      dispatch(clearTermsAndCondition());
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
        headerLabel={I18n.t('myAccount.terms_conditions_header')}
      />

      <ScrollContainer>
        {!isEmpty(termsData) ? (
          <View style={styles.containerWrapper}>
            <HTMLRenderer html={termsData}></HTMLRenderer>
          </View>
        ) : null}
        <Loader loading={loading} />
      </ScrollContainer>
    </View>
  );
}
