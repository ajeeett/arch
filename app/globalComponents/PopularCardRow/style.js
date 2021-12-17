import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontSemiBold, } from '../../utils/config/fonts';
import { width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    imgStyle: {
        width: 200,
        height: 150,
        marginBottom: 5,
        borderRadius: 10,

    },
    viewFlex: {
        alignItems: 'flex-start'
    },
    viewWidth: {
        width: 215,
    },
    heading: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        textAlign: 'left',
        color: colors.appBlue
    },
    subHeading: {
        fontFamily: fontSemiBold,
        fontSize: 13,
        textAlign: 'left',
        color: colors.black,
        marginVertical: 4
    },
    cost: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        textAlign: 'left',
        color: colors.black
    }

});
export default styles;
