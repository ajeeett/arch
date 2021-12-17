import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from './../../../globalComponents/Header/index';
import { colors } from '../../../utils/config/colors';
import I18n from '../../../utils/config/I18n';

// SVG Icon import
import FolderIcon from '../../../assets/svg/FolderIcon';
import StatsIcon from '../../../assets/svg/StatsIcon';
import HelpSupportIcon from '../../../assets/svg/HelpSupportIcon';
import PrivacyIcon from '../../../assets/svg/PrivacyIcon';
import TermsConditionIcon from '../../../assets/svg/TermsConditionIcon';
import LogoutIcon from '../../../assets/svg/LogoutIcon';
import VectorIcon from '../../../globalComponents/VectorIcon';
import NavigationService from '../../../navigation/NavigationService';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { logoutUserAction, logoutUserRequest } from '../../../actions/logoutAction';
import AssessmentIcon from '../../../assets/svg/AssessmentIcon';
import DownloadsIcon from '../../../assets/svg/DownloadsIcon';
import ChangePassIcon from '../../../assets/svg/ChangePassIcon';
import MyProfileIcon from '../../../assets/svg/MyProfileIcons';

export default function MyAccount({ navigation }) {
  const dispatch = useDispatch();
  // const loginReducer = useSelector(state => get(state, 'loginReducer', ''));


  // useEffect(() => {
  //   NavigationService.changeStack('Auth');

  // }, [loginReducer])

  const downloadPressHandler = () => {
    navigation.navigate('Downloads');
  };

  const assessmentPressHandler = () => {
    navigation.navigate('MyAssessment');
  };

  const changePasswordHandler = () => {
    navigation.navigate('ChangePassword');
  };

  const myProfilePressHandler = () => {
    navigation.navigate('MyProfile');
  };

  const StatsPressHandler = () => {
    navigation.navigate('Stats');
  };

  const PrivacyPressHandler = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const goToHelpSupport = () => {
    navigation.navigate('HelpSupport');
  };

  const TermsConditionsPressHandler = () => {
    navigation.navigate('TermsConditions');
  };

  const Icon = () => {
    return (
      <VectorIcon
        groupName={'MaterialIcons'}
        name={'arrow-forward-ios'}
        size={13}
        color={colors.appBlue}
        style={styles.iconStyle}
      />
    );
  };

  const Options = ({ onPressHandler, textStyle, content, svgIcon }) => {
    return (
      <TouchableWithoutFeedback onPress={onPressHandler}>
        <View style={styles.eachElement}>
          {svgIcon}
          <CustomText styles={textStyle} content={content} />
          <Icon />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const logout = async () => {
    Alert.alert(
      "Logout?",
      "Are you sure you want to Logout?",
      [
        {
          text: "Yes",
          onPress: async () => {
            // let payload = { snackbarShow: false };
            // dispatch(logoutUserAction(payload));
            dispatch(logoutUserRequest());
          },
        },
        {
          text: "No",
        },
      ]
    );


  }

  return (
    <ScrollContainer style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        // leftAction={() => { }}
        hideBack
        headerLabel={I18n.t("myAccount.my_acc_header")}
      />

      <View>
        <View style={styles.containerWrapper}>
          <Options
            onPressHandler={myProfilePressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.my_profile")}
            svgIcon={<MyProfileIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={changePasswordHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.change_password_title")}
            svgIcon={<ChangePassIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={downloadPressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.downloads")}
            svgIcon={<DownloadsIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={StatsPressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.stats")}
            svgIcon={<StatsIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={assessmentPressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.assess")}
            svgIcon={<AssessmentIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={goToHelpSupport}
            textStyle={styles.text}
            content={I18n.t("myAccount.help_support")}
            svgIcon={<HelpSupportIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={PrivacyPressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.privacy_policy")}
            svgIcon={<PrivacyIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={TermsConditionsPressHandler}
            textStyle={styles.text}
            content={I18n.t("myAccount.terms_conditions")}
            svgIcon={<TermsConditionIcon width={40} height={40} />}
          />
          <View style={styles.horizontalRule} />
          <Options
            onPressHandler={logout}
            textStyle={[styles.text, styles.textRed]}
            content={I18n.t("myAccount.logout")}
            svgIcon={<LogoutIcon width={40} height={40} />}
          />
        </View>
      </View>
    </ScrollContainer>
  );
}
