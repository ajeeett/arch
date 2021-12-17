import React from 'react';
import { View, Image, Pressable } from 'react-native';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import I18n from '../../../utils/config/I18n';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import AppContainerProfile from '../../../globalComponents/AppContainerProfile';
import CountryCodePicker from '../../../globalComponents/CountryCodePIcker';
import CustomTextBoxRoundDisabled from '../../../globalComponents/CustomTextBoxRoundDisabled';
import CustomTextBoxRound from '../../../globalComponents/CustomTextBoxRound';
import RoundButton from '../../../globalComponents/RoundButton';
import { useState } from 'react';
import { colors } from '../../../utils/config/colors';
import Loader from '../../../globalComponents/Loader';
import SelectClassModal from '../../LoginStack/modals/SelectClassModal/SelectClassModal';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { useEffect } from 'react';
import { fetchCompleteProfile } from '../../../actions/userProfileActions';
import { clearClasses, fetchClasses } from '../../../actions/classesActions';
import { clearUpdateProfileData, requestUpdateProfile } from '../../../actions/completeProfileActions';
import { inValidEmail, inValidPhoneNumber, isEmpty, showSnackBar } from '../../../utils/Helper/helper';


export default function UpdateUserProfile({ navigation }) {

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
    const userProfileReducer = useSelector(state => state.userProfileReducer);

    const completeProfileResp = useSelector(state => state.completeProfileReducer);

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
        console.log(userProfileReducer, '---userProfileReducer');
        setLoading(false);
        if (userProfileReducer?.profileFetched) {
            console.log(userProfileReducer?.profileDataFetched?.data, '===!!@@!');
            setName(userProfileReducer?.profileDataFetched?.data?.name)
            setEmail(userProfileReducer?.profileDataFetched?.data?.emailId)
            setPhoneNumber(userProfileReducer?.profileDataFetched?.data?.mobile)
            setClassId(userProfileReducer?.profileDataFetched?.data?.classId)
            setCurrentClass(userProfileReducer?.profileDataFetched?.data?.className)

        }
        else if (userProfileReducer?.error) {
            showSnackBar(userProfileReducer?.error);
        }

        // if (userProfileReducer?.profileFetched) {
        //     console.warn(userProfileReducer, '--??');
        //     setEmail(userProfileReducer?.profileDataFetched?.data?.emailId)
        //     setPhoneNumber(userProfileReducer?.profileDataFetched?.data?.mobile)
        //     setClassId(userProfileReducer?.profileDataFetched?.data?.classId)
        //     setCurrentClass(userProfileReducer?.profileDataFetched?.data?.className)

        // }
        // else if (userProfileReducer?.error) {
        //     // setLoading(forgotPassResponse?.isFetching);
        //     showSnackBar(userProfileReducer?.error);
        //     // dispatch(clearCompleteProfileData());
        // }
    }, [userProfileReducer]);

    useEffect(() => {
        console.log(completeProfileResp, '---completeP32rofileResp');
        setLoading(false);

        if (completeProfileResp?.profileUpdated) {
            console.log(completeProfileResp, '-12@-??');
            dispatch(clearUpdateProfileData());
            showSnackBar('Profile updated Successfully', colors.lightGreen);
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        }

        else if (completeProfileResp?.error) {
            // setLoading(forgotPassResponse?.isFetching);
            showSnackBar(completeProfileResp?.error);
            dispatch(clearUpdateProfileData());
        }
    }, [completeProfileResp]);

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
    const onSendLink = async () => {
        // navigation.goBack()
        if (validate()) {
            let payload = {
                "Name": name,
                "EmailId": email,
                "Mobile": `${phoneNumber}`,
                "classId": classId
            };
            await dispatch(requestUpdateProfile(payload));
            setLoading(true);

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
                headerLabel={I18n.t('myAccount.my_acc_profile')}
            />
            <AppContainerProfile horizontalPadding>
                {/* <Image
                    resizeMode={'center'}
                    style={styles.logoHead}
                    source={require('./../../../assets/images/logo.png')}
                /> */}

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
                        editable={false}
                        id="email"
                        value={email}
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

                    <RoundButton
                        btnText={styles.saveText}
                        btnStyle={styles.signInBtn}

                        title={I18n.t("auth.save")}
                        handler={onSendLink}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    />


                </View>
                <Loader loading={loading} />
            </AppContainerProfile>

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
