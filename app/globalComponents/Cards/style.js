import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minWidth: '35%',
    borderWidth :1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 10,
  },
  heading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 10,
  },
  customHeading: {
    fontSize: 13,
    color: '#00000080',
    paddingLeft: 10,
  },
  subHeading: {},
  customSubHeading: {
    fontSize: 14,
    color: 'grey',
    paddingLeft: 10,
  },
  content: {
    padding: 10,
    width: '90%',
  },
  customContent: {
    fontSize: 14,
    color: '#2A2A2A',
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  icon: {},
  customSubText: {
    fontSize: 16,
    color: 'grey',
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  customSubContent: {
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});
export default styles;
