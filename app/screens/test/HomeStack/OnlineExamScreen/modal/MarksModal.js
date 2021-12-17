import React from 'react';
import { Text, View, StyleSheet, Modal, Pressable, FlatList, ScrollView } from 'react-native';
import { isTablet } from 'react-native-device-info';
import CustomText from '../../../../globalComponents/CustomText';
import { fontRegular, fontSemiBold } from '../../../../utils/config/fonts';
import { colors } from '../../../../utils/config/colors';
import { scaleByHeight, scaleByWidth } from '../../../../utils/config/theme';
import HTMLRenderer from '../../../../globalComponents/HTMLRenderer';


let color = [colors.white, colors.lightGray];

const MarksModal = props => {

  // console.log(props.questionsCount, '---questionsCount');
  const renderItem = ({ item, index }) => {
    // console.log(props.answersArray);
    return (
      <Pressable
        style={{
          flex: 1 / 6,
          // alignItems: 'center',
          // justifyContent: 'space-evenly'
        }}
        onPress={() => {
          props.goToQuestion(item);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: item.markForReview && (item.value.length > 0) ? colors.purple : item.markForReview && (item.value == '' || item.value.length == 0) ? colors.orange : (item.value != '' || item.value.length != 0) ? colors.lightGreen : colors.buttonYellow,
            borderRadius: 40 / 2,
            width: 40,
            height: 40,
            margin: 10,
            // padding: 30,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{
            textAlign: 'center',
            fontFamily: fontRegular,
            color: item.markForReview ? colors.white : item.value == '' ? colors.appBlue : colors.white
          }}>{item.questionNo}</Text>

        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Modal
        visible={props.modalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          props.setModalVisibility();
        }}>
        <Pressable style={{ flex: 1 }} onPress={() => props.cancelAction()}  >
          <View style={styles.bottomSheetContainer}>
            <ScrollView>
              <HTMLRenderer html={props.htmlContent} />
            </ScrollView>

            <View style={styles.topTabLine} />

          </View>
        </Pressable>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    height: isTablet() ? '40%' : '40%',
    // height: '100%',
    // paddingTop: scaleByHeight(37),
    backgroundColor: colors.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: scaleByWidth(20),
    paddingTop: scaleByHeight(15),
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
  },
  listItem: {
    textAlign: 'center',
    color: colors.appBlue,
    fontFamily: fontRegular,
  },

  topTabLine: {
    height: 5,
    backgroundColor: colors.lightestGray,
    width: 80,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10
  },
  heading: {
    color: colors.appBlue,
    fontFamily: fontSemiBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});

export default MarksModal;
