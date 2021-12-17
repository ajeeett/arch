import React from 'react';
import { View, StyleSheet, Modal, Image, Pressable } from 'react-native';
import { isTablet } from 'react-native-device-info';
import CustomText from '../../../globalComponents/CustomText';
import { fontBold, fontRegular, fontSemiBold } from '../../../utils/config/fonts';
import { colors } from '../../../utils/config/colors';
import { width } from "../../../utils/config/theme";
import RoundButton from '../../../globalComponents/RoundButton';

const AttemptModal = props => {

  return (
    <View style={styles.centeredView}>
      <Modal
        backButtonClose={false}
        visible={props.modalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          props.setModalVisibility();
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => { props.setModalVisibility() }}>

          <View style={isTablet() ? { flex: 1, justifyContent: 'center' } : styles.modalOuter}>
            <View style={isTablet() ? styles.tabModalView : styles.modalView}>
              <Image style={styles.checkIcon} source={require('./../../../assets/images/upcomingTestZero.png')} />
              <CustomText content={'Your score is ' + props.score} styles={styles.heading} />
              <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end' }}>
                <RoundButton
                  btnText={styles.reviewText}
                  btnStyle={styles.reviewBtn}
                  title={'REVIEW RESULT'}
                  handler={() => {
                    props.reviewResult();
                  }}
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginVertical: 22,
  },
  modalOuter: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginVertical: "25%",
  },
  heading: {
    color: colors.appBlue,
    fontFamily: fontSemiBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  description: {
    fontFamily: fontRegular,
    fontSize: 14,
    textAlign: 'center',
    color: colors.appBlack
  },

  checkIcon: {
    marginVertical: 10,
    // width: '50%',

  },
  exploreBtn: {
    width: '100%',
    height: width > 500 ? 50 : 45,
    backgroundColor: colors.appBlue,
    borderRadius: width > 500 ? 35 : 30,
    // paddingBottom: 20
  },

  reviewBtn: {
    width: '100%',
    height: width > 500 ? 50 : 45,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.appBlue,
    borderRadius: width > 500 ? 35 : 30,
    marginTop: 10
  },
  exploreText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
    color: colors.white,
    backgroundColor: 'transparent',
    paddingBottom: 7.5,
  },
  reviewText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
    color: colors.appBlue,
    backgroundColor: 'transparent',
    paddingBottom: 7.5,
  },
  modalView: {
    margin: 40,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  tabModalView: {
    // margin: 40,
    // flex: 1,
    width: 500,
    height: 500,
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AttemptModal;
