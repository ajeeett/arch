import React, { useState, useEffect } from 'react';
import { ImageBackground, View, FlatList, Dimensions, Image } from 'react-native';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import statsButtonBG from '../../../assets/images/statsButtonBG.png';
import statsAchieverButtonBG from '../../../assets/images/statsAchieverButtonBG3x.png';
import { Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../../utils/config/I18n';
import { colors } from '../../../utils/config/colors';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatsResponse, requestStats } from '../../../actions/myAccountActions';
import Loader from '../../../globalComponents/Loader';
import { useFocusEffect } from '@react-navigation/core';
import CustomTextBoxRound from '../../../globalComponents/CustomTextBoxRound';
import CustomButton from '../../../globalComponents/CustomButton';
import { inValidPassword, isEmpty, isNotPasswordSame, showSnackBar } from '../../../utils/Helper/helper';
import AppContainerProfile from '../../../globalComponents/AppContainerProfile';
import RoundButton from '../../../globalComponents/RoundButton';
import { changeStudentPassword, clearChangePass } from '../../../actions/changePasswordAction';



export default function ChangePassword({ navigation }) {

  const dispatch = useDispatch();
  const changePassReducer = useSelector(state => state.changePassReducer);

  const [loading, setLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reEnterNewPassword, setReenterPassword] = useState('')



  const changePassword = async () => {
    if (validate()) {
      let payload = {
        "Password": newPassword,
        "OldPassword": currentPassword
      }
      setLoading(true);
      await dispatch(changeStudentPassword(payload))
    }

  }

  useEffect(() => {
    setLoading(false);
    if (changePassReducer?.passChanged) {
      console.log(changePassReducer?.changePassData?.message, '+++++');
      showSnackBar(changePassReducer?.changePassData?.message, colors.lightGreen);
      setTimeout(() => {
        navigation.goBack();

      }, 2000);
      // console.log(changePassReducer?.stats, '--??');
      // setStatsData(changePassReducer?.stats?.data)
      dispatch(clearChangePass());
    } else if (changePassReducer?.error) {
      showSnackBar(changePassReducer?.error);
      dispatch(clearChangePass());
    }
  }, [changePassReducer]);

  const validate = () => {
    if (isEmpty(currentPassword)) {
      showSnackBar(I18n.t('myAccount.current_password'));
      return false;
    } else if (isEmpty(newPassword)) {
      showSnackBar(I18n.t('myAccount.new_password'));
      return false;
    } else if (inValidPassword(newPassword)) {
      showSnackBar(I18n.t('myAccount.snack_bar_password_validation_error'));
      return false;
    } else if (isEmpty(reEnterNewPassword)) {
      showSnackBar(I18n.t('myAccount.re_enter_password'));
      return false;
    } else if (inValidPassword(reEnterNewPassword)) {
      showSnackBar(I18n.t('myAccount.snack_bar_password_validation_error'));
      return false;
    } else if (isNotPasswordSame(newPassword, reEnterNewPassword)) {
      showSnackBar(I18n.t('myAccount.snack_bar_password_not_match_error'));
      return false;
    }
    else {
      return true;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          navigation.goBack();
        }}
        headerLabel={I18n.t('myAccount.change_password_title')}
      />
      <AppContainerProfile horizontalPadding>

        <View style={styles.containerWrapper}>
          {/* <Image
            resizeMode={'center'}
            style={styles.logoHead}
            source={require('./../../../assets/images/logo.png')}
          /> */}

          <CustomTextBoxRound
            placeholder={I18n.t('myAccount.current_password')}
            keyboardType={'default'}
            changeTextHandler={(value) => setCurrentPassword(value)}
            id="currentPassword"
            value={currentPassword}
            secureTextEntry={true}
          />
          <CustomTextBoxRound
            placeholder={I18n.t('myAccount.new_password')}
            keyboardType={'default'}
            changeTextHandler={(value) => setNewPassword(value)}
            id="newPassword"
            value={newPassword}
            secureTextEntry={true}
          />
          <CustomTextBoxRound
            placeholder={I18n.t('myAccount.re_enter_password')}
            keyboardType={'default'}
            changeTextHandler={(value) => setReenterPassword(value)}
            id="renewPassword"
            value={reEnterNewPassword}
            secureTextEntry={true}
          />
          <RoundButton
            btnText={styles.saveText}
            btnStyle={styles.signInBtn}

            title={I18n.t("myAccount.change_password_title")}
            handler={changePassword}
            // isLoginLoading={isLoader ? isLoginLoading : false}
            disabled={false}
          />
        </View>
        <Loader loading={loading} />
      </AppContainerProfile>
    </View>
  );
}
