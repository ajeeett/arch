import { StyleSheet } from 'react-native';
import { colors } from "../../utils/config/colors"

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    itemStyle: {
        justifyContent: 'flex-start'
    },
    wraperStyle: {
        marginTop: 12,
        width: '100%'
    },
    dropDown: {
        paddingHorizontal: 20,
        paddingVertical: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    dropDownHeight: { height: 300, },
    dropDownContainer: {
        height: 50
    },
    dropDownSelectedLabel: { color: '#090' },
    dropDownLabel: { color: '#009' },
    placeholderStyle: { color: '#443' }
});

export default styles;
