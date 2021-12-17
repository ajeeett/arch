import { StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '../../../utils/config/colors';
import { fontBold } from '../../../utils/config/fonts';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  padd20: {
    paddingHorizontal: 20,
    marginTop: 150,
  },
  titleText: {
    fontFamily: fontBold,
    fontSize: 14,
    color: colors.appBlue,
    // marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  responseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  responseText: {
    fontFamily: fontBold,
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerPosition: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
  },
  animatedView: {
    elevation: 5,
    zIndex: 100,
  },
  flatlistContainer: {
    paddingStart: 20,
    marginBottom: 20,
    marginTop: 5
  },
  headerView: {
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  searchContainerMargTop: {
    marginTop: 150
  }
});

export default styles;
