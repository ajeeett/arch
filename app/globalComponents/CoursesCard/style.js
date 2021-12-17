import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { scaleByHeight, scaleByWidth, width } from '../../utils/config/theme';
import { isTablet } from 'react-native-device-info'

const styles = StyleSheet.create({
    outerView: { paddingHorizontal: 15, paddingVertical: 10, alignItems: 'flex-start' },
    imgStyle: { marginBottom: 5, width: 70, height: 70, borderRadius: 35 },
    tabOuter: {
        width: scaleByWidth(150),
        // height: scaleByHeight(140),
        marginEnd: 10,
        // borderWidth: 1
    },
    normalOuter: {
        width: scaleByWidth(250),
        marginEnd: 10

    },
    // container: {
    //     backgroundColor: 'white',
    //     minWidth: '35%',
    //     borderWidth: 1,
    //     borderColor: "#f2f2f2",
    //     borderRadius: 10,
    //     shadowColor: '#0000000D',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.23,
    //     shadowRadius: 2.62,
    //     elevation: 4,
    //     margin: 10,
    // },
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
    // titleText: {
    //     fontFamily: fontBold,
    //     fontSize: 14,
    //     color: colors.appBlue,
    //     marginBottom: 10
    // },
    heading: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        textAlign: 'left',
        color: colors.white
    },
    subHeading: {
        fontFamily: fontSemiBold,
        fontSize: 13,
        textAlign: 'left',
        color: colors.white,
        marginVertical: 8,
        lineHeight: 30,
        // paddingTop: -6,
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

    container: {
        borderWidth: 1,
        width: "100%",
        height: 15,
        // padding: 3,
        borderRadius: 15,
        justifyContent: "center",
        backgroundColor: '#01539D'
    },
    container1: {
        borderWidth: 1,
        // width: "100%",
        height: 15,
        padding: 3,
        borderRadius: 15,
        justifyContent: "center",
        backgroundColor: '#01539D'
    },
    inner: {
        width: "100%",
        height: 13,
        borderRadius: 15,
        backgroundColor: "white",
    },
    label: {
        fontSize: 10,
        color: "white",
        // position: "absolute",
        zIndex: 1,
        backgroundColor: colors.darkBlue,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 50,
        marginVertical: 5,
        // alignSelf: "center",
        fontFamily: fontRegular
    }
});
export default styles;
