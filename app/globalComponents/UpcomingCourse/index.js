import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Pressable } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';
import WhiteBgPlayBtn from '../../assets/svg/WhiteBgPlayBtn';
import Timers from '../Timers';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import EyeIcon from '../../assets/svg/EyeIcon';
import { showSnackBar } from '../../utils/Helper/helper';
import { useFocusEffect } from '@react-navigation/core';

export default function UpcomingCourse(props) {

    const [hideStartTimer, setHideStartTimer] = useState(false)
    const [showEndTimer, setShowEndTimer] = useState(false)
    const [hideEndTimer, setHideEndTimer] = useState(false)
    const [disablePress, setDisablePress] = useState(false)
    const [liveClassExpired, setLiveClassExpired] = useState(false)
    const [showLiveTag, setShowLiveTag] = useState(false);

    console.log(props.startTimer, 'startTimer');
    console.log(props.endTimer, 'endTimer', props.subHeading);

    useEffect(() => {
        if (hideStartTimer && showEndTimer) {
            setShowLiveTag(true);
        } else setShowLiveTag(false);
    }, [hideStartTimer, showEndTimer])

    useEffect(() => {
        if (props.startTimer == 0 && props.endTimer == 0) {
            console.log("1");
            setShowEndTimer(false);
            setHideStartTimer(true);
            setLiveClassExpired(true)
            setDisablePress(true)
            setShowLiveTag(false);
        } else if (props.startTimer == 0 && props.endTimer > 0) {
            console.log("2");
            setShowLiveTag(true);
            setHideStartTimer(true)
            setShowEndTimer(true)
            setLiveClassExpired(false)
        } else if (props.startTimer > 0 && props.endTimer > 0) {
            console.log("3");
            setShowEndTimer(false);
            setHideStartTimer(false);
            setLiveClassExpired(false)
            setDisablePress(true)
            setShowLiveTag(false);
        } else {
            console.log(props.startTimer, "Porps. starte");
            console.log(props.endTimer, "Porps. end");
        }

    }, [props.startTimer, props.endTimer])


    return (
        <Pressable onPress={disablePress ? () => {
            console.log('disabled')
            showSnackBar('You can\'t enter this class at the moment')
        } : props.onPress} style={isTablet() ? styles.cardOuterTab : styles.cardOuterNormal}>

            {/* {!liveClassExpired ? */}
            <ImageBackground resizeMode={'cover'}
                source={props.bgImage}
                style={{ ...props.style, ...styles.cardBg }}>
                <Image style={styles.bowsStyle} source={props.bowsImage} />

                <View style={styles.viewStyle}>
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 2,
                        top: 5,
                        // marginBottom: 
                    }}>
                        {/* {showLiveTag ? <View style={{
                            backgroundColor: colors.orange,
                            marginEnd: 5,
                            borderRadius: 50,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CustomText lineNumbers={1}
                                ellipseMode={'tail'}
                                styles={styles.testTypeText}
                                content={"• LIVE"} />

                            <Image resizeMode={'cover'} style={{ marginHorizontal: 5, }} source={require('./../../assets/images/eyeicon.png')} />




                            <CustomText lineNumbers={1}
                                ellipseMode={'tail'}
                                styles={styles.testTypeText}
                                content={props.liveAudCount} />

                        </View> : null} */}
                        <View style={{
                            backgroundColor: props.classType == 'FREE' ? colors.lightGreen : colors.red,
                            borderRadius: 50,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            marginEnd: 10
                        }}>
                            <CustomText lineNumbers={1}
                                ellipseMode={'tail'}
                                styles={styles.testTypeText}
                                content={props.classType} />
                        </View>
                    </View>

                    <Image style={styles.imgStyle} source={props.headImage} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.course} content={props.courseName ? `(${props.courseName})` : null} />
                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                </View>

                {props.startTimer == 0 || hideStartTimer ? null :
                    <View style={styles.timerView}>
                        <View style={styles.newsBottom}>
                            <WhiteBgPlayBtn />
                            <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiresText} content={'Starts In'} />
                        </View>
                        <Timers
                            callback={() => {
                                setHideStartTimer(true)
                                setHideEndTimer(false)
                                setShowEndTimer(true)
                                setDisablePress(false)
                            }}
                            initialTime={props.startTimer}
                            startImmediately={true}
                            isLive={true}
                            timerStyle={styles.timerStyle}
                            timerTextStyle={styles.timerTextStyle}
                            timerExternalText={styles.timerExternalText}
                            styleOut={styles.styleOut}
                            hideDays={true}
                        />
                    </View>}

                {
                    showEndTimer ?
                        <View style={styles.timerViewExpires}>
                            <View style={styles.newsBottom}>
                                <WhiteBgPlayBtn color={colors.red} />
                                <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiresText} content={'Expires In'} />
                            </View>
                            <Timers
                                callback={() => {
                                    // setHideEndTimer(true)
                                    setDisablePress(true)
                                    setLiveClassExpired(true)
                                    setShowEndTimer(false)
                                }}
                                initialTime={props.endTimer}
                                startImmediately={true}
                                isLive={true}
                                timerStyle={styles.timerStyle}
                                timerTextStyle={styles.timerTextStyle}
                                timerExternalText={styles.timerExternalText}
                                styleOut={styles.styleOut}
                                hideDays={true}
                            />
                        </View> : null
                }


                {
                    liveClassExpired ?
                        <View style={styles.timerView1}>
                            <View style={styles.newsBottom}>
                                <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiredText} content={'Live class Expired'} />
                            </View>

                        </View> : null
                }
            </ImageBackground>
            {/* : null} */}
        </Pressable>
    )
}