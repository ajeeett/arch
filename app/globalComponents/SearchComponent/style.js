import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { scaleByHeight } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
    },
    errorInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#CF535D',
    },
    SectionStyle: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFF'
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
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        color: colors.black
    }
});

export default styles;
