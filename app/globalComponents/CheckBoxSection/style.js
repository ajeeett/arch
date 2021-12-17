import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontRegular, fontSemiBold } from '../../utils/config/fonts';
import { scaleByHeight, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'

    },
    heading: {
        fontSize: 20,
        color: colors.appBlue,
        fontFamily: fontSemiBold
    },
    maxMarksBtn: {
        paddingHorizontal: 20,
        height: width > 500 ? 50 : 45,
        backgroundColor: colors.lightGreen,
        borderRadius: width > 500 ? 35 : 30,
        marginTop: 10,
        marginEnd: 10
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
        height: width > 500 ? 50 : 45,
        backgroundColor: colors.red,
        borderRadius: width > 500 ? 35 : 30,
        marginTop: 10

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
        height: width > 500 ? 50 : 45,
        backgroundColor: colors.buttonYellow,
        borderRadius: width > 500 ? 35 : 30,
        marginTop: 10
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
