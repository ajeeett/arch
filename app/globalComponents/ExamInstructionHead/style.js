import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold } from '../../utils/config/fonts';
import { scaleByHeight, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 30,
        // borderWidth: 1,
        backgroundColor: '#090'
    },
    outerView: {
        backgroundColor: colors.appBlue,
        paddingHorizontal: 20
    },
    innerView: {
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 5,
        // bottom: 5,

    },
    examView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.lightGray
    },
    headTextNormal: {
        fontFamily: fontRegular,
        fontSize: 10,
        color: colors.appBlack

    },
    boldHead: {
        fontFamily: fontBold,
        fontSize: 10,
        color: colors.appBlack
    },
    heading: {
        // borderWidth: 1,
        marginTop: 5,
        // borderColor: '#FFF',
        fontSize: isTablet() ? 14 : 12,
        color: colors.white,
        fontFamily: fontSemiBold
    },
    hrsText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold,
    },
    timeRem: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fontRegular,
        marginBottom: 8
    },
    hrsLabel: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fontRegular,
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
    }
    ,
    maxMarksText: {
        fontFamily: fontBold,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    previousBtn: {
        width: '30%',
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: colors.purple,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;
