import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../../utils/config/colors';
import { fontBold, fontRegular } from '../../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    text: {
        fontFamily: 'Test'
    },
    heading: {
        fontSize: 18,
        fontFamily: fontRegular,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 10
    },
    signInBtn: {
        width: '100%',
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: colors.appBlue,
        borderRadius: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoHead: {
        width: '100%',
        marginTop: -40
    },
    outer: {
        width: '80%',
        paddingHorizontal: 8,

    },
    saveText: {
        fontFamily: fontBold,
        fontSize: 16,
        color: colors.white
    },
    modalStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute'
    }
});

export default styles;
