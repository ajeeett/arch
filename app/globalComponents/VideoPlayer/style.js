import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
  },
  modalView: {
    width: 200,
    minHeight: 180,
    margin: 20,
    backgroundColor: 'rgba(0,0,0,.9)',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Roboto-medium',
    fontWeight: '600',
    color: '#ffff00',
  },
    modalTextN: {
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Roboto-medium',
    fontWeight: '600',
    color: '#fff',
  },
    modalTextN: {
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Roboto-medium',
    fontWeight: '600',
    color: '#fff',
  },
  videoControlsLeft: {
    position: 'absolute',
    top: '20%',
    left: 0,
    padding: 8,
    borderRadius: 10,
    zIndex: 1000,
    width: '35%',
    height: '60%',
    bottom: '20%',
  },
  videoControlsRight: {
    position: 'absolute',
    top: '20%',
    right: 0,
    padding: 8,
    borderRadius: 10,
    zIndex: 1000,
    width: '35%',
    height: '60%',
    bottom: '20%',
  },
  iconStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  playbackText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
    color: '#fff',
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFF00',
  },
  rowFlex: { 
    flexDirection: 'row' 
  },
  viewWidth: { 
    width: '60%' 
  },
  flexJustify: { 
    justifyContent: 'flex-end' 
  }
});
export default styles;
