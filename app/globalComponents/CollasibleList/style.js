import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold } from '../../utils/config/fonts';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    outerLeftView: {
        // display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        width: '80%'
    },
    outerLeftText: {
        fontFamily: fontBold,
        fontSize: 14,
    },
    outerTitleStyle: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // marginStart: 50
    },
    outerTitleView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    outerChapterSmall: {
        fontFamily: fontSemiBold,
        fontSize: 9,
        textAlign: 'right',

        // borderWidth: 1
    },
    outerTitleText: {
        fontFamily: fontSemiBold,
        fontSize: 9,
        textAlign: 'right',
    },
    resourceText: {
        fontFamily: fontSemiBold,
        fontSize: 9,
        textAlign: 'right',
        color: colors.appBlue
    },
    outerStyle: {
        backgroundColor: colors.lightestGray,
        // paddingHorizontal: 20,
        paddingStart: 20,
        paddingEnd: 10,
        flex: 1,
    },
    outerStyleRes: {
        backgroundColor: colors.lightestGray,
        // paddingHorizontal: 20,
        paddingStart: 15,
        paddingEnd: 15,
        flex: 1,
    },
    innerLeftView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerLeftTopicView: {
        marginEnd: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerTitleStyle: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    innerTitleView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    },
    innerTitleText: {
        fontFamily: fontRegular,
        fontSize: 14,
    },
    innerStyle: {
        backgroundColor: colors.white,
        paddingStart: 20,
        paddingEnd: 10,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightestGray
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    innerRightView: {
        // flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    innerRightInView: {
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: colors.appBlue,
        borderRadius: 20
    },
    textStyleMarginStart: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginStart: 50
    },



    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 88,
        height: 88,
        justifyContent: 'center',
    },
    videoImage: { position: 'absolute' },

    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    itemWrapper: {
        flexDirection: 'column',
        // width: '70%',
        marginLeft: 10,
    },
    headerText: { fontSize: 14, fontFamily: 'Segoe-Bold' },
    contentText: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 3,
        fontSize: 9,
        fontFamily: fontRegular,
    },
    footerTextView: { flexDirection: 'row' },
    footerText: { fontSize: 11, fontFamily: fontSemiBold },
    resourceIcon: {
        backgroundColor: '#D9D9D9',
        width: 90,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    imageIcon: {
        width: 70, height: 70
    },
    gotoVideo: {
        flex: 1,
        // marginTop: -20,
        flexDirection: 'column',
        marginStart: 10,
        // marginEnd: 30
    },
    topicTitle: {
        // flex: 1,
        width: isTablet() ? "88%" : "70%",
        marginEnd: 6.5,
        fontSize: 14,
        fontFamily: fontBold
    },
    tagView: {
        height: 19,
        // backgroundColor: colors.lightGreen,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginEnd: 10
    },
    tag: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontBold
    }
});

export default styles;
