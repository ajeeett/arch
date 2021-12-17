import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular } from '../../utils/config/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 35
    },
    forgotPassText: {
        color: colors.white,
        fontFamily: fontRegular,
        marginBottom: 25
    },
    bottomView: {
        height: 0.5,
        width: '100%',
        backgroundColor: colors.white
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 25
    },
    dontHvAccText: {
        color: colors.white,
        fontFamily: fontRegular,
    },
    signUpText: {
        color: colors.white,
        fontFamily: fontBold,
    },
    orLoginText: {
        marginTop: 25,
        color: colors.white,
        fontFamily: fontRegular,
        marginBottom: 25
    },
    fbGoogleOuter: {
        flexDirection: 'row',
        marginBottom: 10
    },
    googleIcon: {
        marginEnd: 15
    },
    facebookIcon: {
        marginStart: 15
    }

});

export default styles;
