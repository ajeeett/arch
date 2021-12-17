import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Pressable, BackHandler } from 'react-native';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import PlayButton from '../../../assets/svg/PlayButton';
import I18n from '../../../utils/config/I18n';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { formatToReadableDate, getNext30Date, secondsToHms, showSnackBar } from '../../../utils/Helper/helper';
import Loader from '../../../globalComponents/Loader';
import { fetchRecordedClasses } from '../../../actions/recordedClassAction';
import { clearVideoUrl, fetchVideoUrl } from '../../../actions/videoActions';
import VideoPlayer from '../../../globalComponents/VideoPlayer';
import Orientation from 'react-native-orientation';
import UpcomingLiveClassZeroState from '../../../globalComponents/UpcomingLiveClassZeroState';


export default function Downloads({ navigation }) {

  const [recordingData, setRecordingData] = useState('')
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);


  const dispatch = useDispatch();
  const recordedClassesData = useSelector(state => state.recordedClassesReducer);
  const videoReducer = useSelector(state => state.videoReducer);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //     }
  //   }, [])
  // );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
  }, []);


  const handleBackButtonClick = async () => {
    Orientation.lockToPortrait();
    clearPreviousDetails();

    navigation.goBack();
    return true;
  };

  const clearPreviousDetails = async () => {
    await dispatch(clearVideoUrl());
  };

  useEffect(() => {
    clearPreviousDetails();
    fetchDownloadedClasses();

    return () => clearPreviousDetails();
  }, []);

  useEffect(() => {
    setLoading(false);
    if (recordedClassesData?.recordingFetchSuccess) {
      console.log('here', recordedClassesData?.recordedClasses);
      setRecordingData(recordedClassesData?.recordedClasses);
    }
    else if (recordedClassesData?.error) {
      showSnackBar(recordedClassesData?.error);
    }
  }, [recordedClassesData]);

  useEffect(() => {
    setLoading(false);
    if (videoReducer?.videoUrlSuccess) {
      console.log(videoReducer?.videoUrlData?.data, '--??');
      setVideoUrl(videoReducer?.videoUrlData?.data?.videoUrl);
      setShowVideo(true)

    } else if (videoReducer?.error) {
      console.log('in error');
      showSnackBar(videoReducer?.error);
      setShowVideo(false)

    }
  }, [videoReducer]);

  const getVideoInfo = async videoId => {
    console.log(videoId, '--vid');
    if (videoId != null) {
      let payload = {
        VideoId: videoId,
      };
      await dispatch(fetchVideoUrl(payload));
      setLoading(true);
    } else {
      showSnackBar('Video is currently not available. Please come back later.')
    }

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


  const fetchDownloadedClasses = async () => {
    await dispatch(fetchRecordedClasses());
    setLoading(true);
  };


  const CustomImageContainer = ({ source }) => {
    return (
      <Image
        source={source}
        style={styles.videoImage}
        resizeMode="cover"
        width={88}
        height={88}
      />
    );
  };

  const renderItem = (item) => {
    console.log(item, 'pop');
    return (

      <Pressable onPress={() => {
        getVideoInfo(item?.item?.zoomRecording)
      }} style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <CustomImageContainer source={require('./../../../assets/images/thumnailVid.png')} />
          <PlayButton />
        </View>
        <View style={styles.itemWrapper}>
          <CustomText lineNumbers={1} styles={styles.headerText} content={item?.item?.name} ellipseMode={'tail'} />
          <CustomText lineNumbers={4} styles={styles.contentText} content={item?.item?.teacherName} />
          {item?.item?.startDate != null ? <View style={styles.footerTextView}>
            <CustomText lineNumbers={1} styles={styles.footerText} content={'Class Date: '} />
            <CustomText lineNumbers={1} styles={styles.footerText} content={formatToReadableDate(item?.item?.startDate)} />
          </View> : null}
          {item?.item?.startDate != null ? <View style={styles.footerTextView}>
            <CustomText lineNumbers={1} styles={styles.footerText} content={'Expires on: '} />
            <CustomText lineNumbers={1} styles={styles.footerText} content={getNext30Date(item?.item?.startDate)} />
          </View> : null}
          {item?.item?.duration != null ? <View style={styles.footerTextView}>
            <CustomText lineNumbers={1} styles={styles.footerText} content={'Duration: '} />
            <CustomText lineNumbers={1} styles={styles.footerText} content={item?.item?.duration > 0 ? secondsToHms(item?.item?.duration) : "0s"} />
          </View> : null}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {hide ? null : (
        <Header
          leftGroupName={'Ionicons'}
          leftIcon={'arrow-back'}
          leftAction={() => {
            navigation.goBack();
          }}
          headerLabel={I18n.t('myAccount.download_header')}
        />)}

      <View style={{ flex: 1 }}>
        <View style={styles.containerWrapper}>
          {/* <View>
            <CustomText
              styles={styles.textManage}
              content={I18n.t('myAccount.manage')}
            />
          </View> */}
          {recordingData && recordingData.length > 0 ?
            <View style={{ flex: 1 }}>
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
                    // setVidDuration(duration);
                    // console.log(vidDuration, '--vid??')
                    // console.log(progress)
                  }}
                  initialDuration={0}
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
                <View style={{
                  paddingHorizontal: 20,
                  flex: 1,
                }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}

                    data={recordingData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />

                </View>)}

            </View> : <UpcomingLiveClassZeroState
              headImage={require('./../../../assets/images/zeroLiveClassApple.png')}
              heading={I18n.t("home.no_records_available")}
              subHeading={I18n.t("home.please_check_again_after_some_time")}
            />
          }
          <Loader loading={loading} />


        </View>
      </View>
    </View>
  );
}
