import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/config/colors';
import { fontBold, fontSemiBold } from '../../../utils/config/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  saveText: {
    fontFamily: fontBold,
    fontSize: 16,
    color: colors.white
  }, signInBtn: {
    width: '100%',
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: colors.appBlue,
    borderRadius: 50,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoHead: {
    width: '100%',
    marginTop: -40
  },
  containerWrapper: {
    width: '80%',
    paddingHorizontal: 8
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 13,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: 75,
    borderRadius: 10,
    justifyContent: 'center',
  },
  statsHeader: {
    color: colors.white,
    fontSize: 9,
    marginLeft: 20,
    fontFamily: fontSemiBold,
  },
  statsMetrics: {
    color: colors.white,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 19,
    fontFamily: fontSemiBold,
  },
  textColor: {
    color: colors.white,
  },
  headerText: {
    fontFamily: fontBold,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    color: colors.darkBlue,
  },
  textFlex: {
    fontFamily: fontSemiBold,
    textAlign: 'right',
    fontSize: 18,
    marginTop: 25,
    marginRight: "25%",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 10,
    marginRight: "30%",
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageBG: {
    borderRadius: 10
  },
  avatarListWrapper: {
    marginRight: "30%"
  },
  avatarOverlay: {
    marginLeft: -5,
  },
  viewAllTextWrapper: {
    position: 'absolute',
    right: "-45%"
  },
  imageStyleBorder: {
    borderRadius: 10
  },
  statsImageView: { width: '48%' }
});

export default styles;
