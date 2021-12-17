import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import ExamQuestionInstructions from '../ExamQuestionInstructions';
import styles from './style';
import Timers from './../Timers';
import RoundButton from '../RoundButton';
import { fontBold, fontRegular } from '../../utils/config/fonts';
import { colors } from '../../utils/config/colors';
import VectorIcon from '../VectorIcon';

export default function ExamInstructionHead(props) {
    return (
        <View>
            <View style={styles.outerView}>
                <CustomText content={props.heading} styles={styles.heading} />
                <View style={styles.innerView}>
                    {!props.hideTimer ?
                        <View>
                            <CustomText content={'Time Remaining'} styles={styles.timeRem} />
                            <Timers
                                callback={props.over}
                                initialTime={props.timer}
                                startImmediately={true}
                                isLive={true}
                                timerStyle={styles.timerStyle}
                                timerTextStyle={styles.timerTextStyle}
                                timerExternalText={styles.timerExternalText}
                                styleOut={styles.styleOut}
                                hideDays={true}
                            />
                        </View> : <View style={{ flex: 1 }}>
                            {props.isReviewScreen ?
                                <View style={{ flex: 1, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, alignItems: 'flex-start', justifyContent: 'center', }}>
                                    <CustomText content={`Marks: ${(props.individualMarks == '' || props.individualMarks == undefined) ? "0" : props.individualMarks}`} styles={{ fontFamily: fontBold, color: colors.white, fontSize: 16 }} />
                                </View> : null
                            }
                        </View>}
                    {/* <RoundButton

                        btnText={styles.maxMarksText}
                        btnStyle={styles.previousBtn}
                        title={'PREVIOUS'}
                        handler={props.goToPrevious}
                        // isLoginLoading={isLoader ? isLoginLoading : false}
                        disabled={false}
                    /> */}

                    {props.showMarking ? <TouchableOpacity activeOpacity={0.7} onPress={props.openMarkingInfo} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ width: 30, backgroundColor: colors.lightGreen, padding: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, alignItems: 'center', justifyContent: 'center', }}>
                            <CustomText content={`+${props.positiveMarkCount}`} styles={{ fontFamily: fontBold, color: colors.white, fontSize: 14 }} />
                        </View>
                        <View style={props.partialMarkCount?.length > 0 ? { width: 30, backgroundColor: colors.red, padding: 5, alignItems: 'center', justifyContent: 'center', } : { width: 30, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: colors.red, padding: 5, alignItems: 'center', justifyContent: 'center', }}>
                            <CustomText content={props.negativeMarkCount == 0 ? props.negativeMarkCount : `-${props.negativeMarkCount}`} styles={{ fontFamily: fontBold, color: colors.white, fontSize: 14 }} />
                        </View>
                        {props.partialMarkCount?.length > 0 ? <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.buttonYellow, padding: 5, borderTopRightRadius: 5, borderBottomRightRadius: 5, }}>
                            <CustomText content={props.partialMarkCount} styles={{ fontFamily: fontBold, color: colors.darkBlue, fontSize: 14 }} />
                        </View> : null}

                        {/* <VectorIcon
              groupName={props.iconGrpName}
              name={props.iconName}
              size={props.iconSize ? props.iconSize : 20}
              color={props.iconColor ? props.iconColor : 'rgba(0,0,0,0.5)'}
              style={[styles.ImageStyle, props.iconStyle]}
            /> */}
                    </TouchableOpacity> : null}

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={props.showProgress}
                        activeOpacity={0.7}
                    >
                        <Image resizeMode={'contain'} style={{ width: 20, height: 20 }} source={require('./../../assets/images/progressDots.png')} />
                        {/* <CustomText content={'Progress'} styles={styles.progressText} /> */}
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.examView}>
                <ExamQuestionInstructions />
            </View> */}
        </View>
    )
}