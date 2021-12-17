import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { scaleByWidth, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        minWidth: '35%',
        borderWidth: 1,
        borderColor: "#f2f2f2",
        borderRadius: 10,
        shadowColor: '#0000000D',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        margin: 10,
    },
    tabOuter: {
        // width: scaleByWidth(150),
        // height: scaleByHeight(140),
        marginEnd: 10,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
        // borderWidth: 1
    },
    normalOuter: {
        // width: scaleByWidth(250),
        marginEnd: 10,
        marginTop: 10,
        marginBottom: 10,


    },
    cardBg: {
        // flex: 1,
        // width: isTablet() ? 300 : 250,
        // borderWidth: 1,
        // width: width,
        // height: 200,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingStart: 10,
        paddingTop: 10,
        // paddingEnd: 10,
        // margin: 5,
        // borderRadius: 10,
        // backgroundColor: 'transparent',
        // elevation: 2,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 7 },
        // shadowOpacity: 0.5,
        // shadowRadius: 7,
        // // maxWidth: scaleByWidth(250),
        // overflow: 'hidden',
        // width: isTablet() ? scaleByWidth(150) : scaleByWidth(250),

    },
    // cardBg: {
    //     flex: 1,
    //     maxWidth: 250,
    //     borderRadius: 20,
    //     backgroundColor: 'transparent',
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 1
    //     },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 7,
    //     elevation: 10,
    //     overflow: 'hidden'
    // },
    titleText: {
        fontFamily: fontBold,
        fontSize: 14,
        color: colors.appBlue,
        marginBottom: 10
    },
    heading: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        color: colors.zeroStateText,
    },
    subHeading: {
        fontFamily: fontSemiBold,
        fontSize: 13,
        color: colors.zeroStateText,
        marginVertical: 8
    },
    testType: {
        backgroundColor: colors.lightGreen,
        position: 'absolute',
        right: 2,
        top: 5,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginHorizontal: 10
    },
    testTypeText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold
    },
    newsBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timerView: {
        backgroundColor: colors.appBlue,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        // borderBottomEndRadius: 50,
        // borderBottomStartRadius: 50
    },
    expiresText: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fontRegular,
        marginHorizontal: 5
    },
    testTypeText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold
    },
    hrsText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold,
    },
    hrsLabel: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fontRegular,
        marginHorizontal: 5
    },
    timerStyle: {
        marginEnd: 10
        // width: 40
    },
    timerTextStyle: {
        fontSize: 12,
        textAlign: 'center',
        opacity: 1,
        fontFamily: fontBold,
        color: colors.white,
    },
    timerExternalText: {
        fontSize: 12,
        textAlign: 'center',
        color: colors.white,
        fontFamily: fontRegular,
        opacity: 1,
    },
    styleOut: {
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    progressText: {
        color: colors.appBlue,
        fontSize: 16,
        fontFamily: fontBold,
        marginStart: 10
    },
    imgStyle: {
        width: 79,
        height: 74,
        marginBottom: 5,
        borderWidth: 1,

    },
    viewStyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default styles;
