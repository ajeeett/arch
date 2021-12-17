import { StyleSheet } from 'react-native';
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
    headTextNormal: {
        fontFamily: fontRegular,
        fontSize: 12,
        color: colors.black

    },
    boldHead: {
        fontFamily: fontBold,
        fontSize: 12,
        color: colors.black
    },
    heading: {
        fontSize: 20,
        color: colors.appBlue,
        fontFamily: fontSemiBold
    },
    maxMarksBtn: {
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: colors.lightGreen,
        borderRadius: 50,
        marginTop: 10,
        marginEnd: 10,

        alignItems: 'center',
        justifyContent: 'center'
        // paddingBottom: 20
    },
    maxMarksText: {
        fontFamily: fontRegular,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    maxTimeBtn: {
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: colors.red,
        borderRadius: 50,
        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center'

        // paddingBottom: 20
    },
    maxTimeText: {
        fontFamily: fontRegular,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    totalQBtn: {
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: colors.buttonYellow,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
        // paddingBottom: 20
    },
    totalQText: {
        fontFamily: fontRegular,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
        color: colors.appBlue,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },

});

export default styles;
