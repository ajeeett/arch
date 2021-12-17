import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/config/colors';
import { fontRegular } from '../../utils/config/fonts';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Test'
  },
  heading: {
    fontSize: 18,
    fontFamily: fontRegular,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10
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
  modalStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute'
  }
});

export default styles;
