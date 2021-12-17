import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/config/colors';
import { fontRegular } from "../../../utils/config/fonts";
import { fontBold } from '../../../utils/config/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerWrapper: {
    margin: 25,
    marginVertical: 10,
    flex: 1,
  },
  text: {
    fontFamily: fontRegular,
    fontSize: 12,
    color: colors.black,
  },
  titleText: {
    fontFamily: fontBold,
    fontSize: 14,
    color: colors.appBlue,
    // marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 10,
    // paddingHorizontal: 20
  },
});

export default styles;
