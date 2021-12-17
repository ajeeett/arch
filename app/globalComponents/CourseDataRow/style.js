import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontSemiBold } from '../../utils/config/fonts';

const styles = StyleSheet.create({
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
        marginVertical: 8
    },
    cost: {
        fontFamily: fontSemiBold,
        fontSize: 18,
        textAlign: 'left',
        color: colors.black
    },
    pressableStyle: { 
        marginBottom: 10 
    },
    imgStyle: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    innerView: { 
        flex: 1, 
        justifyContent: 'space-evenly', 
        flexDirection: 'column', 
        marginStart: 10 
    },
    outerView: { 
        flexDirection: 'row' 
    }
});
export default styles;
