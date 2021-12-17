import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/config/colors';
import { fontBold, fontRegular, fontSemiBold } from '../../../utils/config/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  textManage: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
    fontSize: 10,
    fontFamily: fontRegular,
    color: colors.appBlue,
  },
  iconStyle: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  itemWrapper: {
    flexDirection: 'column',
    width: '70%',
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 88,
    height: 88,
    justifyContent: 'center',
  },
  headerText: { fontSize: 14, fontFamily: fontBold },
  contentText: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 3,
    fontSize: 9,
    fontFamily: fontRegular,
  },
  footerTextView: { flexDirection: 'row' },
  footerText: { fontSize: 11, fontFamily: fontSemiBold },
  videoImage: { position: 'absolute' },
  downloadItemContainer: { flexDirection: 'column' },
});

export default styles;
