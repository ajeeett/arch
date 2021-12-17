import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler, StyleSheet, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';
import { isEmpty } from 'lodash';
import HTMLRenderer from '../../../../globalComponents/HTMLRenderer';
import Header from '../../../../globalComponents/Header/index';
import Loader from '../../../../globalComponents/Loader';
import { updatePendingCourse } from '../../../../actions/pendingCourseAction';
import { fetchTopicDetail } from '../../../../actions/topicActions';
import ScrollContainer from '../../../../globalComponents/ScrollContainer';

export default function HTMLViewer({ route, navigation }) {
  console.log('inside html viewer');
  const { data, screenTitle, topicId, productId, subjectId } = route?.params;
  console.log(data, screenTitle, topicId, productId, subjectId);

  let header = screenTitle.length > 20 ? screenTitle.toUpperCase().slice(0, 20) + '...' : screenTitle.toUpperCase();

  const [htmlContent, setHTMLContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [topicDuration, setTopicDuration] = useState(
    route?.params?.topicDuration,
  );
  const [htmlViewerDuration, setHtmlViewerDuration] = useState(0);
  const dispatch = useDispatch();
  const topicsReducer = useSelector(state => state.topicsReducer);

  useEffect(() => {
    if (!isEmpty(data)) {
      const textContent = data?.textContent || '';
      const topicFile = data?.topicFile || '';

      if (!isEmpty(textContent)) setHTMLContent(textContent);
      else if (!isEmpty(topicFile)) {
        readHtmlFileContent(topicFile);
      }
    } else callFetchTopicsApi();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
  }, [htmlViewerDuration]);

  const callFetchTopicsApi = async () => {
    let payload = {
      TopicId: topicId,
      ProductId: productId,
      SubjectId: subjectId,
    };
    console.log(payload, '--00000123');
    await dispatch(fetchTopicDetail(payload));
    setLoading(true);
  };

  // handling topic reducer
  useEffect(() => {
    console.log('topic reducer in html viewer', topicsReducer);
    if (topicsReducer?.topicsFetchSuccess && data == undefined) {
      const topicData = topicsReducer?.topicDetails?.data?.topic;
      if (!isEmpty(topicData?.textContent)) {
        setHTMLContent(topicData?.textContent)
      } else if (topicData?.topicFile.includes('.html')) {
        readHtmlFileContent(topicData?.topicFile);
      }
      setTopicDuration(topicData?.topicDuration);
      setLoading(false);
    } else if (topicsReducer?.error) {
      console.log('Error in topic reducers :HTMLViewer');
      setLoading(false);
    }
  }, [topicsReducer]);

  const readHtmlFileContent = url => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .then(r => {
        RNFS.readFile(r.path()).then(res => setHTMLContent(res));
      });
  };

  const callUpdateStudentProgressApi = async () => {
    let payload = {
      topicId: topicId,
      productId: productId,
      progress: topicDuration,
    };
    console.log(payload, '--payload from back press');
    await dispatch(updatePendingCourse(payload));
    // setLoading(true);
  };

  const handleBackButtonClick = async () => {
    console.log('=-=-=-=-=-=');
    await callUpdateStudentProgressApi();
    navigation.goBack();
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          handleBackButtonClick();
        }}
        headerLabel={header || 'HTML Viewer'}
      />
      {htmlContent.length == 0 ? (
        <Loader loading={loading} />
      ) : (
        <ScrollContainer style={styles.container}>
          <HTMLRenderer html={htmlContent}></HTMLRenderer>
        </ScrollContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
