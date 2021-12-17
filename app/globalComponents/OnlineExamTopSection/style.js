import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontRegular, fontSemiBold } from '../../utils/config/fonts';
import { scaleByHeight, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.lightGray
    },
    buttonContainer: { alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' },
    heading: {
        fontSize: 14,
        color: colors.appBlue,
        fontFamily: fontSemiBold
    },
    maxMarksBtn: {
        paddingHorizontal: isTablet() ? 20 : 10,
        height: isTablet() ? 40 : 30,
        backgroundColor: colors.lightGreen,
        borderRadius: 50,
        marginTop: 10,
        marginEnd: 10,
        alignItems: 'center',
        justifyContent: 'center',

        // paddingBottom: 20
    },
    maxMarksText: {
        fontFamily: fontRegular,
        fontSize: isTablet() ? 14 : 12,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    maxTimeBtn: {
        paddingHorizontal: isTablet() ? 20 : 10,
        height: isTablet() ? 40 : 30,
        backgroundColor: colors.red,
        borderRadius: 50,
        marginTop: 10,
        marginEnd: 10,
        alignItems: 'center',
        justifyContent: 'center'

        // paddingBottom: 20
    },
    maxTimeText: {
        fontFamily: fontRegular,
        fontSize: isTablet() ? 14 : 12,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    totalQBtn: {
        paddingHorizontal: isTablet() ? 20 : 10,
        height: isTablet() ? 40 : 30,
        backgroundColor: colors.buttonYellow,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
        // paddingBottom: 20
    },
    totalQText: {
        fontFamily: fontRegular,
        fontSize: isTablet() ? 14 : 12,
        textAlign: 'center',
        marginTop: 3,
        color: colors.appBlue,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },

});

export default styles;
