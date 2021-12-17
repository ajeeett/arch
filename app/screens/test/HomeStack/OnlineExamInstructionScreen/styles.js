import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../../utils/config/colors';
import { fontBold } from '../../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 20
  },
  padd20: {
    paddingHorizontal: 20
  },
  text: {
    fontFamily: 'Test'
  },
  signInBtn: {
    width: '100%',
    height: 50,
    marginTop: 20
  },
  logoHead: {
    width: '100%',
    marginVertical: 10
  },
  outer: {
    width: '100%',
    paddingHorizontal: 8
  },
  cardBg: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#090',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 7
  },
  exploreBtn: {
    width: '100%',
    height: isTablet() ? 50 : 40,
    backgroundColor: colors.appBlue,
    borderRadius: width > 500 ? 35 : 30,
    marginVertical: 10
    // paddingBottom: 20
  },
  exploreText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlign: 'center',
    // marginTop: 5,
    color: colors.white,
    // backgroundColor: 'transparent',
    // paddingBottom: 7.5,
  },
  titleText: {
    fontFamily: fontBold,
    fontSize: 14,
    color: colors.appBlack,
    // marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  checkboxLabel: {
    alignSelf: 'center',
    fontFamily: fontBold,
    fontSize: isTablet() ? 16 : 14,
    paddingEnd: 20
  }
});

export default styles;
