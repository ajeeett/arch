import React, { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { AWS_FILES_BASE_URL, DOCUMENT_VIEWER_URL } from '../../../../api/APIConstants';
import { PdfViewerComponent } from '../../../../globalComponents/PdfViewer';
import { showSnackBar } from '../../../../utils/Helper/helper';
import I18n from '../../../../utils/config/I18n'
import { updatePendingCourse } from '../../../../actions/pendingCourseAction';
import { BackHandler } from 'react-native';
import Loader from '../../../../globalComponents/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicDetail } from '../../../../actions/topicActions';
import { WebviewComponent } from '../../../../globalComponents/Webview';

export default function PdfViewer({ route, navigation }) {
  const productId = route?.params?.productId;
  const topicId = route?.params?.topicId;
  const subjectId = route?.params?.subjectId;
  const sourceUrl = route?.params?.source;

  const [orientation, setOrientation] = useState('');
  const [totalPages, setTotalPages] = useState('0');
  const [pageNumber, setPageNumber] = useState('');
  const [pdfDuration, setPdfDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [topicDuration, setTopicDuration] = useState(route?.params?.topicDuration)

  const dispatch = useDispatch();
  const topicsReducer = useSelector(state => state.topicsReducer);
  const pendingCourseReducer = useSelector(state => state.pendingCourseReducer);

  const injectedJSFunction = `
    function removeHeaderFooter() {
    const elements= document.getElementsByClassName('ndfHFb-c4YZDc-q77wGc');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    const element= document.getElementsByClassName('ndfHFb-c4YZDc-Wrql6b');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
    }; 
    removeHeaderFooter();`

  // listen to the orientation change
  const listenOrientationChange = orientation => {
    console.log(`Listening to the orientation => ${orientation}`);
    if (orientation == 'LANDSCAPE-LEFT') {
      setOrientation('LANDSCAPE-LEFT');
    } else if (orientation == 'PORTRAIT') {
      setOrientation('PORTRAIT');
    } else if (orientation == 'LANDSCAPE-RIGHT') {
      setOrientation('LANDSCAPE-RIGHT');
    }
  };

  // call API for topic details
  const callFetchTopicsApi = async () => {
    let payload = {
      "TopicId": topicId,
      "ProductId": productId,
      "SubjectId": subjectId

    };
    console.log(payload, '--00000123');
    await dispatch(fetchTopicDetail(payload));
    setLoading(true);
  }

  // handling topic reducer
  useEffect(() => {
    console.log('topic reducer in pdf viewer', topicsReducer);
    if (topicsReducer?.topicsFetchSuccess && sourceUrl == undefined) {
      const topicData = topicsReducer?.topicDetails?.data?.topic;
      setFileUrl(topicData?.topicFile);

      setTopicDuration(topicData?.topicDuration);
      setLoading(false);
    } else if (topicsReducer?.error) {
      console.log('Error in topic reducers :PDFViewer');
    }
  }, [topicsReducer])

  // hide bottom navigation and handle orientation
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    (sourceUrl == undefined) ? callFetchTopicsApi() : setFileUrl(sourceUrl.replace(/\\/g, '/'));

    Orientation.unlockAllOrientations();
    let initial = Orientation.getInitialOrientation();
    console.log(`Initial Orientation is ${initial}`);
    setOrientation(initial);
    Orientation.addOrientationListener(listenOrientationChange);

    return () => {
      parent.setOptions({
        tabBarVisible: true,
      });
      Orientation.removeAllListeners(listenOrientationChange);
    };
  }, []);

  useEffect(() => {

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  }, [pdfDuration]);

  const handleBackButtonClick = async () => {
    console.log('=-=-=-=-=-=');
    Orientation.lockToPortrait();
    // console.log(progressVid, '- progressVid');
    await callUpdateStudentProgressApi();

    navigation.goBack();
    return true;
  }

  const callUpdateStudentProgressApi = async () => {
    let payload = {
      "topicId": route?.params?.topicId,
      "productId": route?.params?.productId,
      "progress": topicDuration
    };
    console.log(payload, '--payload from back press');
    await dispatch(updatePendingCourse(payload));
    setLoading(true);
  }

  const pageInputHandler = value => {
    setPageNumber(value);
  };
  useEffect(() => {
    setLoading(false);
    if (pendingCourseReducer?.pendingCourseUpdated) {
      console.log(pendingCourseReducer?.pendingCourseUpdated?.data, '--??');
    } else if (pendingCourseReducer?.error) {
      console.log('in error');
      showSnackBar(pendingCourseReducer?.error);
      // dispatch(clearCourseProductDetail());
    }
  }, [pendingCourseReducer]);

  const PdfFileView = ({ source }) => (
    <>
      <PdfViewerComponent
        uri={source}
        navigation={navigation}
        orientation={orientation}
        activityIndicator={
          <Loader loading={loading} />
        }
        vectorBackHandler={handleBackButtonClick}
        pageNumber={pageNumber}
        pageInputHandler={pageInputHandler}
        totalPages={totalPages}
        pdfLoadComplete={(numberOfPages, path) => {
          setTotalPages(numberOfPages);
          console.log(`PDF file path => `, path);
        }}
        pdfPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        pdfError={error => {
          // if (error.message !== 'canceled') showSnackBar(I18n.t('global.something_went_wrong'));
          console.log('error in pdf view => ', error.message);
        }}
      />
      {/* <Loader loading={loading} /> */}
    </>
  );

  const WebFileView = () => (
    <WebviewComponent
      uri={`${DOCUMENT_VIEWER_URL}${fileUrl}`}
      // uri={`${url}${fileUrl}`}
      navigation={navigation}
      vectorBackHandler={handleBackButtonClick}
      // injectedJavascript={injectedJSFunction}
      // renderLoading={<Loader loading={loading} />}
      navigationState={navEvent => console.log(navEvent)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )

  return (
    <>
      {fileUrl.includes('.pdf') ? <PdfFileView source={fileUrl} /> : <WebFileView source={fileUrl} />}
    </>
  );
}
