import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, Pressable } from 'react-native';
import styles from './style';
import CustomText from '../CustomText';
import WhiteBgPlayBtn from '../../assets/svg/WhiteBgPlayBtn';
import Timers from '../Timers';
import { isTablet } from 'react-native-device-info';
import { showSnackBar } from '../../utils/Helper/helper';
import { useFocusEffect } from '@react-navigation/core';
import { colors } from '../../utils/config/colors';

export default function CardTests(props) {
    const [hideStartTimer, setHideStartTimer] = useState(false)
    const [showEndTimer, setShowEndTimer] = useState(false)
    const [hideEndTimer, setHideEndTimer] = useState(false)
    const [disablePress, setDisablePress] = useState(false)
    const [liveClassExpired, setLiveClassExpired] = useState(false)

    console.log(props.startTimer, 'startTimer for test');
    console.log(props.endTimer, 'endTimer for test');

    useFocusEffect(React.useCallback(() => {
        if (props.startTimer == 0 && props.endTimer == 0) {
            // console.warn('1');
            setShowEndTimer(false);
            setHideStartTimer(true);
            setLiveClassExpired(true)
            setDisablePress(false)
        } else if (props.startTimer == 0 && props.endTimer > 0) {
            // console.warn('2');
            setHideStartTimer(true)
            setShowEndTimer(true)
            setLiveClassExpired(false)
        } else if (props.startTimer > 0 && props.endTimer > 0) {
            // console.warn('3');
            setShowEndTimer(false);
            setHideStartTimer(false);
            setLiveClassExpired(false)
            setDisablePress(true)
        }
    }, []));

    return (

        <View style={styles.mainContainer}>
            <Pressable onPress={disablePress ? () => {
                console.log('disabled')
                showSnackBar('You can\'t enter this test at the moment')
            } : props.onPress} style={isTablet() ?
                styles.tabOuter
                : styles.normalOuter}>

                <ImageBackground resizeMode={'cover'}
                    source={props.bgImage}
                    style={{ ...props.style, ...styles.cardBg }}>
                    <View style={styles.outerView}>
                        {/* {props.testType ? <View style={styles.testType}>
                            <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.testTypeText} content={'FREE'} />
                        </View> :
                            <View style={styles.testTypePaid}>
                                <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.testTypeText} content={'PAID'} />
                            </View>
                        } */}
                        <Image style={styles.imgStyle} source={props.headImage} />
                        <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.heading} content={props.heading} />
                        <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.course} content={props.courseName ? `(${props.courseName})` : null} />
                        <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.subHeading} content={props.subHeading} />
                    </View>

                    {/* <View style={styles.timerView}>
                        <View style={styles.newsBottom}>
                            <WhiteBgPlayBtn />
                            <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiresText} content={'Expires In'} />
                        </View>
                        <Timers
                            callback={() => { }}
                            initialTime={555000}
                            startImmediately={true}
                            isLive={true}
                            timerStyle={styles.timerStyle}
                            timerTextStyle={styles.timerTextStyle}
                            timerExternalText={styles.timerExternalText}
                            styleOut={styles.styleOut}
                            hideDays={true}
                        />
                       
                    </View> */}

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
                            <View style={styles.timerViewRestriction}>
                                <View style={styles.newsBottom}>
                                    <WhiteBgPlayBtn color={colors.red} />
                                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiresText} content={'Restricting Entry in'} />
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
                                    <CustomText lineNumbers={1} ellipseMode={'tail'} styles={styles.expiredText} content={'Entry Restricted'} />
                                </View>

                            </View> : null
                    }
                </ImageBackground>
            </Pressable>
        </View>
    )
}