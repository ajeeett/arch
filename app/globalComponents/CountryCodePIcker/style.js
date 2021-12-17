import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontRegular } from '../../utils/config/fonts';
import { scaleByHeight } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        color: '#000',
        fontSize: 25,
        marginBottom: 25,
        fontWeight: 'bold',
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    pickerStyle: {
        height: 45,
        // marginBottom: 10,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: colors.gray
    },
    selectedCountryTextStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000',
        textAlign: 'right',
    },

    countryNameTextStyle: {
        paddingLeft: 10,
        color: '#000',
        textAlign: 'right',
    },

    searchBarStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 10,
    },



    outerContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    errorInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#CF535D',
    },
    SectionStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: 'transparent',
        paddingHorizontal: 20,
        backgroundColor: '#FFF',

    },
    textboxfieldd: {
        fontSize: 1
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    errorContainer: {
        position: 'absolute',
        bottom: -20,
        // right: 0,
        // left: 0,
        borderWidth: 1,
    },
    error: {
        fontSize: 13,
        left: 0,
        padding: 0,
        paddingLeft: 6,
        color: '#CF535D',
    },

    inputContainer: {
        backgroundColor: '#f4f6f8',
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabel: {
        fontSize: 10,
        color: '#b4b6b8',
    },
    input: {
        color: '#353031',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 3,
        marginRight: 10,
        flex: 1,
    },

    errorText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    textInputStyle: {
        flex: 1,
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        fontSize: 14,
        fontFamily: fontRegular,
        color: colors.black
    }
});

export default styles;
