import React, { useEffect, useState } from 'react';
import { StyleSheet, View, NativeEventEmitter } from 'react-native';
import ZoomUs, { ZoomEmitter } from 'react-native-zoom-us';
import AppContainerProfile from '../../../globalComponents/AppContainerProfile';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header';
import RoundButton from '../../../globalComponents/RoundButton';
import { colors } from '../../../utils/config/colors';
import { ZOOM_CLIENT_KEY, ZOOM_CLIENT_SECRET } from '../../../utils/config/config';
import { fontBold, fontRegular, fontSemiBold } from '../../../utils/config/fonts';
import { secondsToHms, splitDate, tConvert } from '../../../utils/Helper/helper';

const ZoomScreen = ({ navigation, route }) => {
    const { item, name, isInitialized } = route?.params;
    // const [isInitialized, setIsInitialized] = useState(false);
    const [showHome, setShowHome] = useState(false);

    let header = item?.name.length > 20 ? item?.name.toUpperCase().slice(0, 20) + '...' : item?.name.toUpperCase();

    useEffect(() => {
        // initializeZoom();
    }, []);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }

        // For more see https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md
        const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
        const eventListener = zoomEmitter.addListener(
            'MeetingEvent',
            ({ event, status, ...params }) => {
                console.log({ event, status, params }); //e.g.  "endedByHost" (see more: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md)

                if (event == 'endedByHost') {
                    setShowHome(true);
                    navigation.goBack();
                }
                if (event == "endedByHostForAnotherMeeting") {
                    navigation.goBack();
                }
                if (status === 'MEETING_STATUS_CONNECTING') {
                    // setIsMeetingOngoing(true);
                    console.log('connecting');

                }

                if (status === 'MEETING_STATUS_DISCONNECTING') {
                    // Once it is set it is good to render
                    // setIsMeetingOngoing(false);
                    // console.log('MEETING_STATUS_DISCONNECTING');
                }
            },
        );

        return () => eventListener.remove();
    }, [isInitialized]);

    // const initializeZoom = async () => {
    //     ZoomUs.initialize({
    //         clientKey: ZOOM_CLIENT_KEY,
    //         clientSecret: ZOOM_CLIENT_SECRET,
    //     }).then(res => {
    //         console.log('Zoom initialize then response:',res);
    //         setIsInitialized(true);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    const joinMeeting = () => {
        console.log('item => ', item, name);
        try {
            ZoomUs.joinMeeting({
                userName: name,
                meetingNumber: item?.meetingId,
                password: item?.meetingPassword,
                // participantID: 'our-unique-id',
                noAudio: true,
                noVideo: true,
                noTextMeetingId: true,
                meetingTitleHidden: true,
                noTitlebar: false,
                showMeetingPassword: false,
                noInvite: true
            })
                .then(data => console.log('Joined meeting Success', data))
                .catch(err => console.log('Error => ', err))
        } catch (e) {
            console.log("error => ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Header
                leftGroupName={'Ionicons'}
                leftIcon={'arrow-back'}
                leftAction={() => navigation.goBack()}
                headerLabel={header}
            />
            <AppContainerProfile horizontalPadding>
                <View style={styles.containerWrapper}>
                    <View style={styles.details}>

                        <View style={styles.item}>
                            <CustomText content={'Name:'} styles={styles.text} />
                            <CustomText content={item?.name} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                        <View style={styles.item}>
                            <CustomText content={'Course Name:'} styles={styles.text} />
                            <CustomText content={item?.courseName} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                        <View style={styles.item}>
                            <CustomText content={'Teacher:'} styles={styles.text} />
                            <CustomText content={item?.teacherName} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                        <View style={styles.item}>
                            <CustomText content={'Duration:'} styles={styles.text} />
                            <CustomText content={secondsToHms(item?.duration)} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                        <View style={styles.item}>
                            <CustomText content={'Start Time:'} styles={styles.text} />
                            <CustomText content={`${tConvert(item?.startDate)}, ${splitDate(item?.startDate)}`} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                        <View style={styles.item}>
                            <CustomText content={'End Time:'} styles={styles.text} />
                            <CustomText content={`${tConvert(item?.endDate)}, ${splitDate(item?.endDate)}`} ellipseMode={"tail"} lineNumbers={1} styles={styles.textRegular} />
                        </View>
                    </View>

                    <RoundButton
                        btnText={styles.saveText}
                        btnStyle={styles.signInBtn}
                        title={'Launch Meeting'}
                        handler={joinMeeting}
                        disabled={false}
                    />
                </View>
            </AppContainerProfile>
        </View>
    );
};

export default ZoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.white,
    },
    containerWrapper: {
        width: '90%',
        paddingHorizontal: 4,
    },
    saveText: {
        fontFamily: fontBold,
        fontSize: 16,
        color: colors.white,
    },
    signInBtn: {
        width: '100%',
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: colors.appBlue,
        borderRadius: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        width: '100%',
        height: '60%',
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15
    },
    text: {
        color: colors.black,
        marginStart: 5,
        fontSize: 16,
        fontFamily: fontSemiBold,
    },
    textRegular: {
        color: colors.black,
        marginStart: 5,
        fontSize: 16,
        fontFamily: fontRegular,
        width: "80%"
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        marginBottom: 6,
    },
});
