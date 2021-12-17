import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontSemiBold } from '../../utils/config/fonts';
import { scaleByHeight, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    greenBtn: {
        width: '30%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,
        backgroundColor: colors.lightGreen,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    violetBtn: {
        width: '48%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,

        backgroundColor: colors.purple,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maxMarksBtn: {
        width: '48%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,

        backgroundColor: colors.lightGreen,
        borderRadius: 50,
        marginTop: 10,
        // marginEnd: 10,

        alignItems: 'center',
        justifyContent: 'center'
        // paddingBottom: 20
    },
    darkText: {
        fontFamily: fontBold,
        fontSize: isTablet() ? 12 : 10,
        textAlign: 'center',
        marginTop: 3,
        color: colors.appBlue,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    whiteBtn: {
        width: '30%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,
        borderColor: colors.appBlue,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    yellowBtn: {
        width: '30%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,

        backgroundColor: colors.buttonYellow,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maxMarksText: {
        fontFamily: fontBold,
        fontSize: isTablet() ? 12 : 10,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 5,
    },
    previousBtn: {
        width: '30%',
        paddingHorizontal: 20,
        height: isTablet() ? 40 : 30,

        backgroundColor: colors.appBlue,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;
