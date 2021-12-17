import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../utils/config/colors';
import { fontBold } from '../../utils/config/fonts';
import { scaleByHeight } from '../../utils/config/theme';

const styles = StyleSheet.create({
  outerContainer: {
    // flex: 1
  },
  blueBg: {
    height: 100,
    width: '100%',
    backgroundColor: colors.appBlue
  },
  container: {
    flexDirection: 'row',
    minHeight: (80),
    backgroundColor: colors.appBlue,
    paddingHorizontal: 12
  },
  headerText: {
    color: colors.white,
    fontSize: isTablet() ? 16 : 14,
    fontFamily: fontBold
  },
  customStyles: {
    textAlign: 'center',
  },
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textContainer: {
    marginLeft: 10,
  },
  logo: {
    alignItems: 'center',
  },
  headerView: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 40,
  },
  imgFlex: { flex: 1 }
});

export default styles;
