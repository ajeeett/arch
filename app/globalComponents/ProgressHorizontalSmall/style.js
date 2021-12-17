import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { scaleByWidth, width } from '../../utils/config/theme';
import { isTablet } from 'react-native-device-info'

const styles = StyleSheet.create({

    container: {
        width: "100%",
        height: 10,
        // padding: 3,
        borderRadius: 15,
        justifyContent: "center",
        backgroundColor: '#01539D'
    },
    inner: {
        width: "100%",
        height: 12,
        borderRadius: 15,
        backgroundColor: colors.white,
    },
    labelCenter: {
        fontSize: 10,
        color: colors.appBlue,
        position: "absolute",
        backgroundColor: colors.white,
        // borderWidth: 1,
        zIndex: 1,
        // left: 0,
        right: 10,
        // alignSelf: "center",
        fontFamily: fontRegular
    },
    label: {
        fontSize: 10,
        color: "white",
        position: "absolute",
        minWidth: 20,

        zIndex: 1,
        // borderWidth: 1,
        // borderColor: '#fff',

        // alignSelf: "center",
        fontFamily: fontRegular
    }
});
export default styles;
