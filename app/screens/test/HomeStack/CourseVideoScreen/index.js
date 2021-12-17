import React, { useState, useEffect, useRef } from 'react';
import { get } from 'lodash';
import {
  Text,
  View,
  BackHandler,
  FlatList,
  LogBox,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Header from '../../../globalComponents/Header/index';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import CustomText from '../../../globalComponents/CustomText';
import CollapsibleList from '../../../globalComponents/CollasibleList/index';
import VideoPlayer from '../../../globalComponents/VideoPlayer';
import CollasibleComponent from '../../../globalComponents/CollasibleComponent';
import I18n from '../../../utils/config/I18n';
import TeachersCoursesCard from '../../../globalComponents/TeachersCoursesCard';
import {
  millisToMinutesAndSeconds,
  showSnackBar,
} from '../../../utils/Helper/helper';
import {
  clearTopicDetail,
  fetchTopicDetail,
} from '../../../actions/topicActions';
import Loader from '../../../globalComponents/Loader';
import { clearVideoUrl, fetchVideoUrl } from '../../../actions/videoActions';
import { updatePendingCourse } from '../../../actions/pendingCourseAction';
import Orientation from 'react-native-orientation-locker';
import { clearTestDetails } from '../../../actions/onlineExamActions';

export default function CourseVideoScreen({ navigation, route }) {
  const productId = route?.params?.productId;
  const topicId = route?.params?.topicId;
  const topicFile = route?.params?.topicFile;
  const subjectId = route?.params?.subjectId;

  let progressVid = 0;

  console.log(productId, '---prod');
  console.log(topicId, '---topicId');
  console.log(topicFile, '---topicFile');
  console.log(subjectId, '---subjectId');

  const [vidDuration, setVidDuration] = useState(0);
  const [initDuration, setInitDuration] = useState(0);

  const [prodId, setProdId] = useState('');
  const [topicIdData, setTopicIdData] = useState('');
  const [subIdData, setSubIdData] = useState('');
  const [topicFileData, setTopicFileData] = useState('');

  const [currentIndex, setCurrentIndex] = useState(null);
  const [video, setVideo] = useState('');
  const [videoUrl, setVideoUrl] = useState({});

  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const ref = useRef();
  const handlePress = () => setExpanded(!expanded);
  const courseData = [
    {
      name: 'Organic Chemistry • Chapter Name',
      description: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
      ],
    },
  ];

  const dispatch = useDispatch();
  const commonReducer = useSelector(state => state.commonReducer);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicDetailsData, setTopicDetails] = useState({});
  const [courseStructure, setCourseStructure] = useState([]);
  const [subjectArr, setSubjectArr] = useState([]);
  const [resourceCount, setResourceCount] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const topicsReducer = useSelector(state => state.topicsReducer);
  const videoReducer = useSelector(state => state.videoReducer);
  const pendingCourseReducer = useSelector(state => state.pendingCourseReducer);

  const isLoading = useSelector(state =>
    get(state, 'topicsReducer.isLoading', false),
  );
  const topicDetails = useSelector(state =>
    get(state, 'topicsReducer.topicDetails', {}),
  );

  const videoUrlData = useSelector(state =>
    get(state, 'topicsReducer.videoUrlData', {}),
  );

  useFocusEffect(
    React.useCallback(() => {
      clearPreviousDetails();

      callFetchTopicsApi();
      return () => { };
    }, []),
  );

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    ]);
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      console.log('unmounted');
      // BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
  }, [vidDuration]);

  const handleBackButtonClick = async () => {
    Orientation.lockToPortrait();
    // console.log(progressVid, '- progressVid');
    await callUpdateStudentProgressApi();
    clearPreviousDetails();

    navigation.goBack();
    return true;
  };

  const clearPreviousDetails = async () => {
    await dispatch(clearVideoUrl());
    await dispatch(clearTopicDetail());
    await dispatch(clearTestDetails());
  };

  const callUpdateStudentProgressApi = async () => {
    let payload = {
      topicId: route?.params?.topicId,
      productId: route?.params?.productId,
      progress: vidDuration,
    };
    console.log(payload, '--payload');
    await dispatch(updatePendingCourse(payload));
    setLoading(true);
  };

  const callFetchTopicsApi1 = async (topicIdData, prodId, subIdData) => {
    let payload = {
      TopicId: topicIdData,
      ProductId: prodId,
      SubjectId: subIdData,
    };
    await dispatch(fetchTopicDetail(payload));
    setLoading(true);
  };

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
  const getVideoInfo = async videoId => {
    console.log(videoId, '--vid');
    let payload = {
      VideoId: videoId,
    };
    await dispatch(fetchVideoUrl(payload));
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    if (topicsReducer?.topicsFetchSuccess) {
      console.log(topicDetails?.data, '--??');
      setTopicDetails(topicDetails?.data);
      console.log(topicDetails?.data?.topic?.progress, '---duration');
      const duration = topicDetails?.data?.topic?.progress;
      setInitDuration(duration);

      const courseData = [
        {
          name: topicsReducer?.topicDetails?.data?.topic?.name,
          description: [
            topicsReducer?.topicDetails?.data?.topic?.name,
            // description
          ],
        },
      ];

      console.log('sucssfetch');

      const contentType = topicsReducer?.topicDetails?.data?.topic?.contentType;
      if (contentType == 6) {
        console.log('######with video');
        setShowPdf(false);
        setPdfUrl('');
        setShowVideo(true);
        getVideoInfo(topicsReducer?.topicDetails?.data?.topic?.topicVideo);
      } else if (contentType == 1) {
        // showSnackBar('no', colors.gradientBlue)

        setShowPdf(true);
        setShowVideo(false);
        setPdfUrl(topicsReducer?.topicDetails?.data?.topic?.topicFile);
        setVideoUrl(null);
      } else {
        setVideoUrl(null);
        setShowPdf(false);
        setPdfUrl('');
        setShowVideo(false);
      }

      setCourseStructure(courseData);
      setSubjectArr(topicDetails?.data?.subject);
      // dispatch(clearCourseProduct());
    } else if (topicsReducer?.error) {
      console.log('in error');
      showSnackBar(topicsReducer?.error);
      // dispatch(clearCourseProductDetail());
    }
  }, [topicsReducer]);

  useEffect(() => {
    setLoading(false);
    if (videoReducer?.videoUrlSuccess) {
      console.log(videoReducer?.videoUrlData?.data, '--??');
      setVideoUrl(videoReducer?.videoUrlData?.data?.videoUrl);

      // dispatch(clearCourseProduct());
    } else if (videoReducer?.error) {
      console.log('in error');
      showSnackBar(videoReducer?.error);
      // dispatch(clearCourseProductDetail());
    }
  }, [videoReducer]);

  // useEffect(() => {
  //   setLoading(false);
  //   if (pendingCourseReducer?.pendingCourseUpdated) {
  //     console.log(pendingCourseReducer?.pendingCourseUpdated?.data, '--??');
  //   } else if (pendingCourseReducer?.error) {
  //     console.log('in error');
  //     showSnackBar(pendingCourseReducer?.error);
  //     // dispatch(clearCourseProductDetail());
  //   }
  // }, [pendingCourseReducer]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // hideBottomTabBar();

  //     return () => {

  //     };
  //   }, [])
  // );
  const hideBottomTabBar = async () => {
    setVisible(!visible);
    // navigation.setOptions({
    //   headerShown: false,
    //   hideBottomTabBar: true
    // });

    // await (dispatch(hideTabBar()));
    // navigation.setParams({ tabBarVisible: false });
    // navigation.setOptions({ tabBarVisible: false })
    // console.log(navigation);
  };
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: visible,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: visible,
      });
  }, [visible]);

  const openMoreInthisChapter = item => {
    console.log('item vid', item);
    console.log('content type', item?.contentType);

    if (item?.contentType == 6) {
      console.log('######with video');
      setShowPdf(false);
      setPdfUrl('');
      setShowVideo(true);
      getVideoInfo(item?.topicVideo);
    } else if (item?.contentType == 1) {
      // showSnackBar('no', colors.gradientBlue)
      console.log('in pdf');
      setShowPdf(true);
      setShowVideo(false);
      setPdfUrl(item.topicFile);
      setVideoUrl(null);
      navigation.navigate('PdfViewer', {
        source: item?.topicFile,
        topicId: item?.id,
        productId: productId,
        topicDuration: item?.topicDuration,
      });
    } else if (item?.contentType == 4) {
      console.log('in HTMLViewer');
      setShowPdf(true);
      setShowVideo(false);
      setPdfUrl(item.topicFile);
      setVideoUrl(null);

      navigation.navigate('HTMLViewer', {
        htmlString: item?.textContent || '',
        htmlContentUrl: item?.topicFile,
        screenTitle: item?.name,
        topicId: item?.id,
        productId: productId,
        topicDuration: item?.topicDuration,
      });
    } else if (item?.contentType == 2) {
      console.log('in test');
      navigation.navigate('OnlineExamInstructionScreen', {
        testId: item?.url
      });
    } else if (item?.contentType == 5 && item?.ispaid == 0) {
      showSnackBar('This is a live class');
    } else if (item?.contentType == 0 && item?.ispaid == 0) {
      showSnackBar('This is a live test');
    } else if (item.status && item?.contentType == 5 && item?.ispaid == 1) {
      showSnackBar('You have not purchased this course');
    } else {
      console.log('in else');
      showSnackBar('Sorry, You did not purchased this subject / topic');
    }

    // item.topicFile ?
    //   item?.topicFile.includes('.pdf') ?
    //     navigation.navigate('PdfViewer', {
    //       source: item.topicFile
    //     }) : navigation.navigate('DocViewer', {
    //       source: item.topicFile
    //     }) :
    //   // null;
    //   navigation.navigate('CourseVideoScreen');
  };

  const pickIcon = (data) => {
    const { contentType } = data;
    switch (contentType) {
      case 0: return require('./../../../assets/images/testIconChapter.png')
      case 1: return require('./../../../assets/images/pdfIconChapter.png')
      case 2: return require('./../../../assets/images/testIconChapter.png')
      case 3: return require('./../../../assets/images/testIconChapter.png')
      case 4: return require('./../../../assets/images/textIconChapter.png')
      case 5: return require('./../../../assets/images/liveClassIconChapter.png')
      case 6: return require('./../../../assets/images/videoIconChapter.png')
      default: return require('./../../../assets/images/pdfIconChapter.png')
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <TeachersCoursesCard
        onPress={() => {
          console.log(item, '---item');
          openMoreInthisChapter(item);
        }}
        showCoursesBg
        courseImage={pickIcon(item)}
        gradImg={require('./../../../assets/images/blueGradVertical.png')}
        headImage={require('./../../../assets/images/rangeIcon.png')}
        bgImage={require('./../../../assets/images/blueGradVertical.png')}
        heading={item?.name}
        subHeading={millisToMinutesAndSeconds(item?.topicDuration) + ' Mins'}
      />
    );
  };

  const show = async () => {
    // navigation.setOptions({
    //   headerShown: true,
    //   hideBottomTabBar: true
    // });
    // navigation.setParams({ tabBarVisible: true });
    // await (dispatch(showTabBar()));
    // navigation.setOptions({ tabBarVisible: true })
  };

  // useEffect(() => {
  //   console.log('ttttttttttttttttttttttttttttttttttt');
  //   if (topicIdData != '' && prodId != '') {
  //     callFetchTopicsApi1();

  //   }
  // }, [topicIdData]);

  const emptyList = () => {
    if (topicDetailsData?.nextTopics?.length != 0) return null;

    return (
      <View>
        <Text>No Data Present</Text>
      </View>
    );
  };

  const setRef = ref => {
    inputRef = ref;
    inputRef.pause();
    console.log(ref, '---000000000099999');
  };

  return (
    <View style={styles.container}>
      {hide ? null : (
        <Header
          leftGroupName={'Ionicons'}
          leftIcon={'arrow-back'}
          leftAction={() => { }}
          headerLabel={I18n.t('home.course_home_header')}
        />
      )}

      {showVideo ? (
        <VideoPlayer
          // ref={(r) => {
          //   props.setRef()
          //   console.log(r, '-------vidref')
          // }}
          setRef={ref => setRef(ref)}
          getDuration={progress => {
            const duration = Math.floor(progress.currentTime);
            // console.log(duration, '---myduration')

            // progressVid = duration;
            // console.log(progressVid)
            setVidDuration(duration);
            // console.log(vidDuration, '--vid??')
            // console.log(progress)
          }}
          initialDuration={initDuration}
          fullScreenD={val => {
            if (val) {
              setVisible(false);

              setHide(true);
            } else {
              setVisible(true);

              setHide(false);
            }
          }}
          navigation={navigation}
          url={videoUrl}

        // https://player.vimeo.com/external/578476137.sd.mp4?s=ace2421b9860f3c5917054b3e5e095f271858a01&profile_id=165&oauth2_token_id=1517126270

        // http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8
        />
      ) : null}

      {hide ? null : (
        <ScrollContainer>
          <View>
            <View style={styles.marginHr}>
              {/* <Button
              style={{ fontSize: 20, color: 'green' }}
              styleDisabled={{ color: 'red' }}
              onPress={() => {
                setProdId(2)
                setTopicIdData(3)
                // const a = this.video.onSeekRelease(20 / this.state.duration);
                // console.log(a, '--a')
              }}
              title="Press Me">
            </Button> */}
              <CollasibleComponent
                ref={ref}
                currentIndex={currentIndex}
                setCurrentIndex={val => setCurrentIndex(val)}
                data={courseStructure}
                showPdf={showPdf}
                onPress={() => {
                  pdfUrl?.includes('.pdf')
                    ? navigation.navigate('PdfViewer', {
                      source: pdfUrl,
                    })
                    : navigation.navigate('DocViewer', {
                      source: pdfUrl,
                    });
                }}
              // pdfLink={}
              />

              <CustomText
                styles={styles.labelText}
                content={I18n.t('home.more_chapter')}
              />
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{}}
              contentContainerStyle={{ paddingStart: 20, marginBottom: 20 }}
              data={topicDetailsData?.nextTopics}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={emptyList}
            />
            {/* <CollapsibleList
            subjectArray={
              subjectArr ? subjectArr : []
            }
            resourceCount={resourceCount}
            goToVideo={(e, i) => {
              clearPreviousDetails();
              callFetchTopicsApi1(e.id, productId, i.id);
              console.log(e);
              console.log(i);
              // setProdId(productId)
              // setTopicIdData(e.id)
              // setSubIdData(i.id)
              // navigation.navigate('CourseVideoScreen', {
              //   topicId: e.id,
              //   productId: productId,
              //   topicFile: e?.topicFile,
              //   subjectId: i?.id
              // });

            }}
          /> */}

            <CollapsibleList
              subjectArray={subjectArr ? subjectArr : []}
              resourceCount={resourceCount}
              // courseData={courseData}
              goToVideo={(e, i) => {
                console.log(e, 'clicked data####');
                console.log(i);
                var status = e?.status;
                if (status && e?.enableBeforeLiveClass && e?.contentType == 6) {
                  clearPreviousDetails();
                  callFetchTopicsApi1(e.id, productId, i.id);
                } else if (status && e?.enableBeforeLiveClass && e?.contentType == 1) {
                  console.log(e, '----Go to pdf');

                  navigation.navigate('PdfViewer', {
                    source: e?.topicFile,
                    topicId: e.id,
                    productId: productId,
                    topicDuration: e?.topicDuration,
                  });
                } else if (status && e?.enableBeforeLiveClass && e?.contentType == 4) {
                  console.log(e, '----Go to HTMLViewer');
                  navigation.navigate('HTMLViewer', {
                    data: e,
                    topicId: e?.id,
                    productId: productId,
                    topicDuration: e?.topicDuration,
                  });
                } else if (status && e?.enableBeforeLiveClass && e?.contentType == 2) {
                  console.log(e, '----Go to TEst');
                  navigation.navigate('OnlineExamInstructionScreen', {
                    testId: e?.url
                  });
                } else if (e?.contentType == 5 && e?.ispaid == 0) {
                  console.log(e, '----basic type');
                  showSnackBar('This is a live class');
                } else if (status && e?.contentType == 5 && e?.ispaid == 1) {
                  console.log(e, '----basic type');
                  showSnackBar('You have not purchased this course');
                } else {
                  showSnackBar(
                    'Sorry, You did not purchased this subject / topic',
                  );
                }
              }}
            />
          </View>
        </ScrollContainer>
      )}
      <Loader loading={loading} />
    </View>
  );
}
