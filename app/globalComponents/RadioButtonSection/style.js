import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontRegular, fontSemiBold } from '../../utils/config/fonts';
import { scaleByHeight, width } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    }

});

export default styles;
