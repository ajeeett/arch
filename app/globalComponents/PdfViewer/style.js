import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold } from '../../utils/config/fonts';
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    closeIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
        marginRight: 5,
        zIndex: 100,
        elevation: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    flex: { flex: 1 },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
    },
    responseText: {
        fontSize: 14,
        color: colors.black,
        textAlign: 'center',
    },
    positionInputContainer: {
        width: '100%',
        height: 50,
    },
    inputBox: {
        padding: 5,
        height: 50,
        color: colors.appBlack,
        // borderColor: "#000"
    },
    exploreBtn: {
        width: '75%',
        height: width > 500 ? 50 : 40,
        backgroundColor: colors.appBlue,
        borderRadius: width > 500 ? 35 : 30,
        marginTop: -5,
    },
    exploreText: {
        fontFamily: fontBold,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
        color: colors.white,
        backgroundColor: 'transparent',
        paddingBottom: 7.5,
    },
    buttonOpacity: {
        width: 100,
        height: 45,
        marginTop: 20,
    },
    sectionStyle: {
        width: 100,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20,
    },
    containerLandscape: {
        flex: 1, width: "100%",
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconLandscape: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 100,
        elevation: 5,
        zIndex: 100,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    contentContainer: { flexDirection: 'row', width: "100%", height: '100%' },
    inputLandscape: {
        flexDirection: 'column',
        width: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdfLandscape: {
        width: '75%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdfStyle: { width: '100%', height: '100%' },
    portText: { marginLeft: 20 },
    landText: { marginTop: 15 },
    portTextBox: { marginBottom: 10, marginHorizontal: 20 },
    landTextBox: { marginTop: 5 },
    portButton: { marginBottom: 5 },
    landButton: { marginLeft: 15 },
    height: { height: 50 }
});
