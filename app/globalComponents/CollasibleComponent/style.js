import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold } from '../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    text: {
        fontFamily: 'Test'
    },
    signInBtn: {
        width: '100%',
        height: 50,
        marginTop: 20
    },
    logoHead: {
        width: '100%',
        marginVertical: 10
    },
    outer: {
        width: '100%',
        paddingHorizontal: 8
    },
    cardBg: {
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingStart: 10,
        paddingTop: 10,
        paddingEnd: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#090',
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 7
    },


    labelText: {
        fontFamily: fontBold,
        fontSize: 14,
        color: colors.appBlue,
        marginBottom: 10,
        paddingTop: 20,
        // paddingBottom: 10,
    },
    listContainer: {
        // paddingHorizontal: 30
    },
    card: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerText: {
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderColor: colors.gray
    },
    heading: {
        color: colors.appBlue,
        flex: 1,
        paddingVertical: 20,
        fontFamily: fontSemiBold,
        fontSize: 18
    },
    body: {
        width: '100%',
        textAlign: 'left',
        padding: 20,
        color: '#000'
    },
    subCategoriesList: {
        // backgroundColor: colors.gray,
        width: '100%'
    },
    subCatText: {
        fontFamily: fontSemiBold,
        fontSize: 14
    },
    maxMarksText: {
        fontFamily: fontBold,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    greenBtn: {
        width: isTablet() ? '30%' : '48%',
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: colors.appBlue,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropDownIconView: { alignItems: 'flex-start', justifyContent: 'center' },
    dropDownIconRotateView: { transform: [{ rotate: '180deg' }], alignItems: 'flex-start', justifyContent: 'center' },
    toStyle: { flexDirection: 'row' },
    viewWidth: { width: '100%' }
});

export default styles;
