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
  footerTextView: { flexDirection: 'row' },
  footerText: { fontSize: 11, fontFamily: fontSemiBold },

  listItem: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerText: { fontSize: 14, fontFamily: fontBold },
  contentText: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 3,
    fontSize: 11,
    fontFamily: fontRegular,
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
    // flex: 1
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 88,
    height: 88,
    justifyContent: 'center',
  },
  modalStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
  },
});

export default styles;
