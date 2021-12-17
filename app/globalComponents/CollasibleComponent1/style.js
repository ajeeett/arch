import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold } from '../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    titleStyle: {
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        flex: 1,
        borderWidth: 1,
        display: 'flex'
        // marginStart: 50
    }, 
    titleViewStyle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleLeftStyle: {
        backgroundColor: colors.lightestGray,
        paddingHorizontal: 30,
        flex: 1,
    },
    textStyle: {
        fontFamily: fontSemiBold,
        fontSize: 20,
        textAlign: 'right',
        borderWidth: 1
    },
    listStyle: {
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightestGray
    },
    listTitleView: {
        display: 'flex',
        flexDirection: 'row'
    },
    listTitleText: {
        fontFamily: fontSemiBold,
        fontSize: 9,
        textAlign: 'right',
    },
    resourceContainer: {
        // flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    resourceView: {
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
});

export default styles;
