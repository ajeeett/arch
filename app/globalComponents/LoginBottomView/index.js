import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FacebookIcon from '../../assets/svg/FacebookIcon';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import CustomText from '../CustomText';
import styles from './style';
import I18n from './../../utils/config/I18n';
import { colors } from '../../utils/config/colors';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk-next';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function LoginBottomView(props) {
  return (
    <View style={styles.container}>
      {props.hideForgotPassword ? null : (
        <TouchableOpacity onPress={props.onForgetPassword}>
          <CustomText
            styles={styles.forgotPassText}
            content={I18n.t('auth.forget_pass')}
          />
        </TouchableOpacity>
      )}
      {props.hideLine ? null : <View style={styles.bottomView} />}
      {props.hideDontHaveAccount ? null : (
        <View style={styles.signUpContainer}>
          <CustomText
            styles={styles.dontHvAccText}
            content={I18n.t('auth.dont_hv_acc')}
          />
          <TouchableOpacity onPress={props.onSignUp}>
            <CustomText
              styles={styles.signUpText}
              content={I18n.t('auth.sign_up')}
            />
          </TouchableOpacity>
        </View>
      )}
      {props.hideGoogle ? null : <CustomText
        styles={styles.orLoginText}
        content={I18n.t('auth.or_login_with')}
      />}
      {props.hideGoogle ? null : <View style={styles.fbGoogleOuter}>
        <TouchableOpacity onPress={props.onGoogleButtonPress} style={styles.googleIcon}>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.handleFacebookLogin} style={styles.facebookIcon}>
          <FacebookIcon />
        </TouchableOpacity>
      </View>}


    </View>
  );
}
