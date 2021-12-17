import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { scaleByWidth, width } from '../../utils/config/theme';
import { isTablet } from 'react-native-device-info'

const styles = StyleSheet.create({
    viewStyle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'flex-start'
    },
    tabOuter: {
        width: 300
    },
    normalOuter: {
        width: 250
    },
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
    cardBg: {
        // flex: 1,
        width: isTablet() ? 300 : 250,
        // borderWidth: 1,
        // width: width,
        // height: 200,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingStart: 10,
        paddingTop: 10,
        // paddingEnd: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        // maxWidth: scaleByWidth(250),
        overflow: 'hidden',
        width: isTablet() ? scaleByWidth(150) : scaleByWidth(250),

    },
    titleText: {
        fontFamily: fontBold,
        fontSize: 14,
        color: colors.appBlue,
        marginBottom: 10
    },
    heading: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        textAlign: 'left',
        color: colors.appBlack
    },
    subHeading: {
        fontFamily: fontSemiBold,
        fontSize: 13,
        textAlign: 'left',
        color: colors.appBlack,
        marginVertical: 8
    },
    newsTag: {
        backgroundColor: colors.red,
        position: 'absolute',
        right: 2,
        top: 5,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginHorizontal: 10
    },

    newsText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold
    },
    imgStyle: { marginBottom: 5 }
});
export default styles;
