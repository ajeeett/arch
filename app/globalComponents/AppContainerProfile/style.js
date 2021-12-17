import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { scaleByHeight } from '../../utils/config/theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    imgBg: {
        width: '100%',
        height: '100%',
    },
    cardBg: {

        // marginHorizontal: isTablet() ? 100 : 40,
        // marginVertical: isTablet() ? 100 : 40,
        flex: 1,
        // paddingTop: 10,
        // margin: 5,
        // borderRadius: 10,
        backgroundColor: 'transparent',
        // elevation: 2,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 7 },
        // shadowOpacity: 0.5,
        // shadowRadius: 7,
        // overflow: 'hidden',

    },
});

export default styles;
