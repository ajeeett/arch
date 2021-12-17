import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { width } from '../../utils/config/theme';

const styles = StyleSheet.create({

    titleText: {
        fontFamily: fontBold,
        fontSize: 20,
        color: colors.appBlue,
        marginBottom: 20,
        marginTop: 20
    },
    courseImage: {
        width: '100%',
        // flex: 1,
        borderRadius: 15,
        // width: width,
        height: isTablet() ? 500 : 200
        // height: '20%',
    },
    descriptionText: {
        fontFamily: fontSemiBold,
        fontSize: 14,
        color: colors.appBlack,
        marginTop: 20,
    },
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
        marginVertical: 8
    }

});
export default styles;
