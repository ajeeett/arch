import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontSemiBold, fontSemiBold1 } from '../../utils/config/fonts';
import { width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        minWidth: '35%',
        borderWidth: 1,
        borderColor: "#f2f2f2",
        borderRadius: 10,
        shadowColor: '#0000000D',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        margin: 10,
    },
    cardBg: {
        flex: 1,
        // width: width,
        // height: 200,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingStart: 10,
        // paddingTop: 10,
        // paddingEnd: 10,
        // margin: 5,
        // borderRadius: 10,
        // backgroundColor: colors.white,
        // elevation: 7,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 7 },
        // shadowOpacity: 0.5,
        // shadowRadius: 7,
        // maxWidth: 250,
    },
    titleText: {
        fontFamily: fontBold,
        fontSize: 14,
        color: colors.appBlue,
        marginBottom: 10
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
    },
    gradImg: {
        position: 'absolute', width: 250, top: 0,
        bottom: 10,
        borderRadius: 10
    },
    headImg: {
        position: 'absolute',
        right: 0,
    },
    customTextStyle: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'flex-start'
    },
    pressableWidth: {
        width: 250
    },
    viewContainer: {
        flex: 1
    }
});
export default styles;
