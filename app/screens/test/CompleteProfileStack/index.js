import React, { useState, useEffect } from 'react';
import { View, Image, Pressable } from 'react-native';
import styles from './styles';
import CustomTextBoxRound from '../../globalComponents/CustomTextBoxRound';
import CustomButton from '../../globalComponents/CustomButton/index';
import AppContainer from '../../globalComponents/AppContainer';
import I18n from '../../utils/config/I18n';
import { inValidEmail, inValidPhoneNumber, isEmpty, showSnackBar } from '../../utils/Helper/helper';
import { useDispatch, useSelector } from 'react-redux';
import { clearForgotPassData, requestForgotPassword } from '../../actions/forgotPasswordActions';
import Loader from './../../globalComponents/Loader';
import { get } from 'lodash';
import { colors } from '../../utils/config/colors';
import CustomText from '../../globalComponents/CustomText';
import CustomTextBoxRoundDisabled from '../../globalComponents/CustomTextBoxRoundDisabled';
import SelectClassModal from '../LoginStack/modals/SelectClassModal/SelectClassModal';
import { useFocusEffect } from '@react-navigation/core';
import { clearClasses, fetchClasses } from '../../actions/classesActions';
import { clearCompleteProfileData, requestCompleteProfile } from '../../actions/completeProfileActions';
import CountryCodePicker from '../../globalComponents/CountryCodePIcker';
import { fetchCompleteProfile } from '../../actions/userProfileActions';
// import OTPModal from '../modals/OTPModal/OTPModal';

export default function CompleteProfile({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [caller, setCaller] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [currentClass, setCurrentClass] = useState('');
    const [classesData, setClassesData] = useState(false);
    const [classId, setClassId] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const classesResponse = useSelector(state => state.classesReducer);

    const completeProfileResp = useSelector(state => state.completeProfileReducer);
    const profileDataFetchedResp = useSelector(state =>
        get(state, 'userProfileReducer', false),
    );
    const isLoading = useSelector(state =>
        get(state, 'forgotPassReducer.isLoading', false),
    );



    useFocusEffect(
        React.useCallback(() => {
            getAllClasses();
            getUserData();
            return () => {

            }
        }, [])
    );

    const getUserData = async () => {
        await dispatch(fetchCompleteProfile());
        setLoading(true);
    }

    const getAllClasses = async () => {
        await dispatch(fetchClasses());
        setLoading(true);
    }

    useEffect(() => {
        setLoading(false);
        if (classesResponse?.classesFetchSuccess) {
            console.log(classesResponse?.classesData, '--??');
            setClassesData(classesResponse?.classesData);
        } else if (classesResponse?.error) {
            showSnackBar(classesResponse?.error);
            dispatch(clearClasses());
        }
    }, [classesResponse]);


    useEffect(() => {
        console.log(profileDataFetchedResp, '---profileDataFetchedResp');

        if (profileDataFetchedResp?.profileFetched) {
            console.log(profileDataFetchedResp, '--??');
            setName(profileDataFetchedResp?.profileDataFetched?.data?.name);
            setEmail(profileDataFetchedResp?.profileDataFetched?.data?.emailId)
            setPhoneNumber(profileDataFetchedResp?.profileDataFetched?.data?.mobile)
            setClassId(profileDataFetchedResp?.profileDataFetched?.data?.classId)
            setCurrentClass(profileDataFetchedResp?.profileDataFetched?.data?.className)

            setLoading(false);
        }
        else if (profileDataFetchedResp?.error) {
            // setLoading(forgotPassResponse?.isFetching);
            showSnackBar(profileDataFetchedResp?.error);
            // dispatch(clearCompleteProfileData());
            setLoading(false);
        }
    }, [profileDataFetchedResp]);

    useEffect(() => {
        console.log(completeProfileResp, '---completeP32rofileResp');
        setLoading(false);

        if (completeProfileResp?.navigateToHome) {
            console.log(completeProfileResp, '-12@-??');
            // dispatch(clearCompleteProfileData());
            showSnackBar('Profile updated Successfully', colors.lightGreen);
        }

        else if (completeProfileResp?.error) {
            // setLoading(forgotPassResponse?.isFetching);
            showSnackBar(completeProfileResp?.error);
            dispatch(clearCompleteProfileData());
        }
    }, [completeProfileResp]);

    const onSendLink = async () => {
        if (validate()) {
            let payload = {
                "Name": name,
                "EmailId": email,
                "Mobile": `${phoneNumber}`,
                "classId": classId
            };
            await dispatch(requestCompleteProfile(payload));
            setLoading(true);

        }
    };
    const validate = () => {
        console.log(name, email, currentClass, phoneNumber);
        if (isEmpty(name)) {
            showSnackBar(I18n.t('auth.snack_bar_username_error'));
            return false;
        } else if (isEmpty(email)) {
            showSnackBar(I18n.t('auth.snack_bar_empty_email_error'));
            return false;
        } else if (inValidEmail(email)) {
            showSnackBar(I18n.t('auth.snack_bar_email_validation_error'));
            return false;
        } else if (isEmpty(currentClass)) {
            showSnackBar(I18n.t('auth.snack_bar_empty_class_error'));
            return false;
        } else if (isEmpty(phoneNumber)) {
            showSnackBar(I18n.t('auth.snack_bar_empty_phone_error'));
            return false;
        } else if (inValidPhoneNumber(phoneNumber)) {
            showSnackBar(I18n.t('auth.snack_bar_validation_phone_error'));
            return false;
        }
        else {
            return true;
        }
    };




    return (
        <View>
            <AppContainer horizontalPadding>
                <Image
                    resizeMode={'center'}
                    style={styles.logoHead}
                    source={require('./../../assets/images/logo.png')}
                />
                <CustomText
                    lineNumbers={1}
                    ellipseMode={'tail'}
                    styles={styles.heading}
                    content={I18n.t('auth.incomplete_profile_message')} />

                <View style={styles.outer}>
                    <CustomTextBoxRound
                        placeholder={I18n.t('auth.name')}
                        keyboardType={'default'}
                        changeTextHandler={(value) => setName(value)}
                        id="name"
                        value={name}
                    />
                    <CustomTextBoxRound
                        placeholder={I18n.t('auth.create_acc_email')}
                        keyboardType={'email-address'}
                        changeTextHandler={(value) => setEmail(value)}
                        id="email"
                        value={email}
                        editable={false}
                    />
                    <CustomTextBoxRoundDisabled
                        placeholder={I18n.t('auth.class')}
                        keyboardType={'default'}
                        id="class"
                        value={currentClass}
                        iconGrpName={'Fontisto'}
                        iconName={'caret-down'}
                        iconColor={colors.appBlue}
                        iconSize={15}
                        onPress={() => setBottomSheetVisible(true)}
                    />
                    <CountryCodePicker
                        countryCode={countryCode}
                        selectedValue={val => {
                            setCountryCode(val)
                        }}
                        placeholder={I18n.t('auth.mobile')}
                        keyboardType={'numeric'}
                        changeTextHandler={(value) => {
                            setPhoneNumber(value.replace(/[- #*+;,.<>\{\}\[\]\\\/]/gi, ''))
                        }}
                        id="mobile"
                        value={phoneNumber}
                        maxLength={10}
                    />

                    <CustomButton
                        style={styles.signInBtn}
                        title={I18n.t("auth.save")}
                        handler={onSendLink}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    />


                </View>
                <Loader loading={loading} />
            </AppContainer>

            {bottomSheetVisible && (
                <Pressable
                    onPressIn={() => {
                        setBottomSheetVisible(!bottomSheetVisible);
                    }}
                    onPress={() => { }}
                    style={styles.modalStyle}>
                    <SelectClassModal
                        modalVisible={bottomSheetVisible}
                        setModalVisibility={() => {
                            setBottomSheetVisible(!bottomSheetVisible);
                        }}
                        cancelAction={() => {
                            setBottomSheetVisible(!bottomSheetVisible);
                        }}
                        classList={classesData}
                        getCurrentClass={(data) => {
                            setCurrentClass(data?.name);
                            setClassId(data?.classId)
                        }}
                    />
                </Pressable>
            )}
        </View>
    );
}
