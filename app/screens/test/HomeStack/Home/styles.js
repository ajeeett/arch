import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { colors } from '../../../utils/config/colors';
import { fontBold } from '../../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#FFF',
    paddingBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  padd20: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  text: {
    fontFamily: 'Test',
  },
  signInBtn: {
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  logoHead: {
    width: '100%',
    marginVertical: 10,
  },
  outer: {
    width: '100%',
    paddingHorizontal: 8,
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
    shadowRadius: 7,
  },
  exploreBtn: {
    // width: '100%',
    height: width > 500 ? 50 : 45,
    backgroundColor: colors.appBlue,
    borderRadius: width > 500 ? 35 : 30,
    marginStart: 20,
    marginEnd: 20
    // paddingBottom: 20
  },
  exploreText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
    color: colors.white,
    backgroundColor: 'transparent',
    paddingBottom: 7.5,
  },
  titleText: {
    fontFamily: fontBold,
    fontSize: 14,
    color: colors.appBlue,
    // marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  headerBG: {
    height: isTablet() ? 340 : 200,
    paddingBottom: 20,
    // paddingStart: isTablet() ? 96 : 20, //handle tab case as well
    // paddingEnd: isTablet() ? 100 : 25, //handle tab case as well

  },
  swiperHeaderBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.appBlue,
    height: '50%',

  },
  sectionSpacing: {
    paddingStart: 20,
    marginBottom: 20
  },
  alignCen: {
    alignItems: 'center'
  }
});

export default styles;
