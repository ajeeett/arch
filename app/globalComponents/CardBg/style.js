import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
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
        paddingStart: 5,
        paddingTop: 5,
        paddingEnd: 5,
        paddingBottom: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: colors.white,
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        overflow: 'hidden'
    }

});
export default styles;
