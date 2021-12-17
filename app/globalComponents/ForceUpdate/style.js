import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15,
  },
  notNowText: {
    color: '#0277f8',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  mT15: { marginVertical: Platform.OS === 'ios' ? 20 : 15 },
  mTImage: { marginTop: 15 },
  btnUpdate: {
    width: '100%',
    marginTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    color: '#00000080',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  headingText: {
    fontFamily: 'Roboto-Medium',
    color: '#2a2a2a',
    fontSize: 22,
    marginTop: 15,
  },
});

export default styles;
