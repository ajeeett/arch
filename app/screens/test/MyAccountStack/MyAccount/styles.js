import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../../utils/config/colors';
import { fontRegular } from '../../../utils/config/fonts';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.white,
  },
  containerWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fontRegular,
    fontSize: 14,
    paddingLeft: 20,
  },
  eachElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  horizontalRule: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  iconStyle: {
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  textRed: {
    color: colors.red,
  },
});

export default styles;
