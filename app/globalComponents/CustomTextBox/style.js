import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 15,
    backgroundColor: '#FFF'
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  errorContainer: {
    position: 'absolute',
    bottom: -18,
    right: 10,
  },
  error: {
    fontSize: 13,
    left: 0,
    padding: 0,
    paddingLeft: 6,
    color: '#CF535D',
  },
  textInputFlex: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  }
});

export default styles;
