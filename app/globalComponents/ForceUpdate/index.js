import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Linking,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './style';
import { get } from 'lodash';
import SwipeMenu from 'app/globalComponents/SwipeMenu';
import CustomButton from 'app/globalComponents/CustomButton';
import ForceUpdateIcon from 'app/assets/images/ForceUpdate/Update';
import crashlytics from '@react-native-firebase/crashlytics';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { checkVersion } from 'react-native-check-version';
import {
  setSoftUpdateTimestamp,
  getVersionDetail,
  setSoftUpdateVisibility,
  setForceUpdateVisibility,
  setPopupVisibility,
} from 'app/actions/welcomeScreenActions';
import {
  getCurrentTimeStamp,
  calculateTimeDifferenceInHrs,
} from 'app/api/methods/dateFormat';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const image = { data: <ForceUpdateIcon /> };
const iosStoreURL = 'https://apps.apple.com/in/app/allen-digital/id1512922338';
const androidStoreUrl =
  'https://play.google.com/store/apps/details?id=app.allendigital.in';

export default function ForceUpdate(props) {
  //states
  const [storeUrl, setStoreUrl] = useState('');
  const [needsUpdate, setNeedUpdate] = useState(false);

  let defaultTimeStamp = 3; //hrs
  let secondDefaultTimeStamp = 72; //hrs

  // Redux stuff
  const dispatch = useDispatch();
  const loginData = useSelector(state =>
    get(state, 'loginReducer.data.jwt', {}),
  );

  const softUpdateData = useSelector(state =>
    get(state, 'welcomeScreenReducer.SoftUpdateData', {}),
  );

  const isWelcomeScreen = useSelector(state =>
    get(state, 'welcomeScreenReducer.visible', {}),
  );

  const isForceUpdate = useSelector(state =>
    get(state, 'welcomeScreenReducer.isForceUpdateVisible', false),
  );

  const showSwipe = useSelector(state =>
    get(state, 'welcomeScreenReducer.isPopupVisible', false),
  );

  const isSoftUpdate = useSelector(state =>
    get(state, 'welcomeScreenReducer.isSoftUpdateVisible', false),
  );

  const versionData = useSelector(state =>
    get(state, 'welcomeScreenReducer.versionData.data', {}),
  );

  useEffect(() => {
    crashlytics().log(`TRACE : Soft/Force Update screen`);
    getVersionDetail(loginData, dispatch);
    if (!isWelcomeScreen) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }
  }, []);

  useEffect(() => {
    if (!isWelcomeScreen) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }
  }, [showSwipe]);

  useEffect(() => {
    if (Object.keys(versionData).length > 0) {
      checkUpdateNeeded(versionData);
    }
  }, [versionData]);

  const handleBackButtonClick = () => {
    if (showSwipe && isSoftUpdate) {
      handleNotNow();
    } else if (props.showMatSwipe) {
      props.handleMatSwipe(false);
    } else if (props.showExamSwipe) {
      props.handleExamSwipe(false);
    } else if (props.handleHardwareBack) {
      Alert.alert('Hold on!', 'Would you like to Exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
    } else if (props.navigation && !isForceUpdate) {
      props.navigation.goBack();
    }
    return true;
  };

  const checkUpdateNeeded = async data => {
    let currentAppVersion = DeviceInfo.getVersion();
    const storeData = await checkVersion({
      platform: Platform.OS,
      bundleId: DeviceInfo.getBundleId(),
      currentVersion: currentAppVersion,
    });
    let updateNeeded = false;
    let latestVersion = data.latest_released_version;
    let minmRequiredVersion = data.minimum_required_version;
    if (Platform.OS == 'ios') {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=1512922338&country=in`,
      )
        .then(r => r.text())
        .then(r => JSON.parse(r));
      if (response && response.results && response.results.length > 0) {
        updateNeeded =
          compare(response.results[0].version, currentAppVersion) == 1
            ? true
            : false;
        setNeedUpdate(updateNeeded);
        setStoreUrl(iosStoreURL);
      }
    } else {
      setStoreUrl(androidStoreUrl);
      updateNeeded = storeData.needsUpdate;
      setNeedUpdate(storeData.needsUpdate);
    }
    if (updateNeeded && softUpdateData) {
      if (compare(minmRequiredVersion, currentAppVersion) == 1) {
        dispatch(setSoftUpdateVisibility(false));
        dispatch(setForceUpdateVisibility(true));
        dispatch(setPopupVisibility(true));
      } else if (
        Object.keys(softUpdateData).length == 0 &&
        compare(latestVersion, currentAppVersion) == 1
      ) {
        ///initial case
        dispatch(setForceUpdateVisibility(false));
        dispatch(setSoftUpdateVisibility(true));
        dispatch(setPopupVisibility(true));
      } else if (
        Object.keys(softUpdateData).length > 0 &&
        compare(latestVersion, currentAppVersion) == 1
      ) {
        if (
          !softUpdateData.visibleAfterShortDuration &&
          calculateTimeDifferenceInHrs(softUpdateData.timestamp) >=
            defaultTimeStamp
        ) {
          dispatch(setForceUpdateVisibility(false));
          dispatch(setSoftUpdateVisibility(true));
          dispatch(setPopupVisibility(true));
        } else if (
          softUpdateData.visibleAfterShortDuration &&
          calculateTimeDifferenceInHrs(softUpdateData.timestamp) >=
            secondDefaultTimeStamp
        ) {
          dispatch(setForceUpdateVisibility(false));
          dispatch(setSoftUpdateVisibility(true));
          dispatch(setPopupVisibility(true));
        } else {
          dispatch(setForceUpdateVisibility(false));
          dispatch(setPopupVisibility(false));
          dispatch(setSoftUpdateVisibility(false));
        }
      }
    } else {
      dispatch(setForceUpdateVisibility(false));
      dispatch(setPopupVisibility(false));
      dispatch(setSoftUpdateVisibility(false));
    }
  };

  const handleUpdateNow = () => {
    if (isForceUpdate || isSoftUpdate) {
      if (Platform.OS === 'android') {
        crashlytics().setAttribute('storeURL', androidStoreUrl);
        Linking.openURL(androidStoreUrl);
      } else {
        crashlytics().setAttribute('storeURL', iosStoreURL);
        Linking.openURL(iosStoreURL);
      }
    }
  };

  const compare = (a, b) => {
    a = a.toString();
    b = b.toString();
    if (a === b) {
      return 0;
    }
    var a_components = a.split('.');
    var b_components = b.split('.');
    var len = Math.min(a_components.length, b_components.length);
    for (var i = 0; i < len; i++) {
      // A bigger than B
      if (parseInt(a_components[i]) > parseInt(b_components[i])) {
        return 1;
      }
      // B bigger than A
      if (parseInt(a_components[i]) < parseInt(b_components[i])) {
        return -1;
      }
    }
    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
      return 1;
    }
    if (a_components.length < b_components.length) {
      return -1;
    }
    // Otherwise they are the same.
    return 0;
  };

  const panelProps = {
    openLarge: true,
    onlyLarge: true,
    onClose: () => {},
    style: {
      height: height - (height * 3) / 2,
      borderWidth: 1,
      borderColor: '#CCC',
    },
    fullWidth: true,
    noBackgroundOpacity: false,
    closeOnTouchOutside: false,
    noBar: true,
  };

  const softUpdateContent = {
    headingText: 'Update available',
    description: 'We recommend you to update the latest version.',
    notNow: true,
  };

  const forceUpdateContent = {
    headingText: 'Get the latest version',
    description:
      "Looks like you're using an older version. Update now for less bugs, better performance and latest features.",
    notNow: false,
  };

  const handleNotNow = () => {
    let currentTimeStamp = getCurrentTimeStamp();
    if (
      softUpdateData &&
      Object.keys(softUpdateData).length > 0 &&
      softUpdateData.visibleAfterShortDuration
    ) {
      softUpdateData.timestamp = currentTimeStamp;
      setSoftUpdateTimestamp(softUpdateData, dispatch);
    } else if (
      softUpdateData &&
      Object.keys(softUpdateData).length > 0 &&
      !softUpdateData.visibleAfterShortDuration
    ) {
      softUpdateData.visibleAfterShortDuration = true;
      softUpdateData.timestamp = currentTimeStamp;
      setSoftUpdateTimestamp(softUpdateData, dispatch);
    } else if (softUpdateData && Object.keys(softUpdateData).length == 0) {
      let data = {};
      data['timestamp'] = currentTimeStamp;
      data['visibleAfterShortDuration'] = false;
      setSoftUpdateTimestamp(data, dispatch);
    }
    dispatch(setSoftUpdateVisibility(false));
    dispatch(setPopupVisibility(false));
  };

  const swipeableContentData = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.mTImage}>{image.data}</Text>
        <Text style={styles.headingText}>
          {isSoftUpdate
            ? softUpdateContent.headingText
            : isForceUpdate && forceUpdateContent.headingText}
        </Text>
        <Text style={styles.description}>
          {isSoftUpdate
            ? softUpdateContent.description
            : isForceUpdate && forceUpdateContent.description}
        </Text>
        {(isForceUpdate || isSoftUpdate) && (
          <CustomButton
            style={[styles.btnUpdate, { marginBottom: isForceUpdate ? 20 : 0 }]}
            handler={() => handleUpdateNow()}
            title="Update Now"
          />
        )}
        {isSoftUpdate && (
          <TouchableOpacity style={styles.mT15} onPress={handleNotNow}>
            <Text style={styles.notNowText}>Not Now</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const swipeableContent = <View>{swipeableContentData()}</View>;

  return (
    <>
      {showSwipe && (
        <SwipeMenu
          isActive={showSwipe}
          panelProps={panelProps}
          content={swipeableContent}
        />
      )}
    </>
  );
}
