import React from 'react';
import { Text, View, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { isTablet } from 'react-native-device-info';
import CustomText from './../../../globalComponents/CustomText';
import { fontBold, fontRegular, fontSemiBold } from '../../../utils/config/fonts';
import { colors } from './../../../utils/config/colors';
import { scaleByHeight, scaleByWidth } from './../../../utils/config/theme';

let color = [colors.white, colors.lightGray];

const ProgressModal = props => {

  // console.log(props.questionsCount, '---questionsCount');
  const renderItem = ({ item, index }) => {
    // console.log(props.answersArray);
    return (
      <Pressable
        style={{
          flex: 1 / 6,
          alignItems: 'center',
          justifyContent: 'space-evenly'
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
        animationType={'slide'}
        onRequestClose={() => {
          props.setModalVisibility();
        }}>
        <Pressable onPress={() => props.cancelAction()} style={{ flex: 1 }}>
          <View style={styles.bottomSheetContainer}>

            <View style={styles.topTabLine} />

            <CustomText content={'Your Progress'} styles={styles.heading} />
            <View style={{ borderBottomWidth: 1, borderStartWidth: 1, borderEndWidth: 1, borderColor: colors.gray }}>
              <View style={{ backgroundColor: colors.buttonYellow, marginBottom: 8,paddingVertical: 5 }}>
                <CustomText content={'Question Palette'} styles={{ justifyContent: 'center', alignSelf: 'center', color: colors.appBlue, fontSize: 12, fontFamily: fontBold }} />
              </View>
              <View style={{ paddingStart: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: colors.lightGreen, width: 20, height: 20, borderRadius: 5 }} />
                    <CustomText content={'Answered'} styles={{
                      color: colors.black,
                      marginStart: 5,
                      fontSize: 12,
                      fontFamily: fontSemiBold
                    }} />
                  </View>
                  <View style={{ paddingEnd: 10, flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                    <View style={{ backgroundColor: colors.buttonYellow, width: 20, height: 20, borderRadius: 5 }} />
                    <CustomText content={'Not Answered'} styles={{
                      color: colors.black,
                      marginStart: 5,
                      fontSize: 12,
                      fontFamily: fontSemiBold
                    }} />
                  </View>

                </View>



                <View style={{ marginVertical: 5, flexDirection: 'row' }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: colors.orange, width: 20, height: 20, borderRadius: 5 }} />
                    <CustomText content={'Mark For Review'} styles={{
                      color: colors.black,
                      marginStart: 5,
                      fontSize: 12,
                      fontFamily: fontSemiBold
                    }} />
                  </View>
                  <View style={{ paddingEnd: 10, flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                    <View style={{ backgroundColor: colors.purple, width: 20, height: 20, borderRadius: 5 }} />
                    <CustomText content={'Answered & Marked for Review'} styles={{
                      color: colors.black,
                      marginStart: 5,
                      fontSize: 12,
                      fontFamily: fontSemiBold
                    }} />
                  </View>

                </View>
              </View>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={6}
              data={props.answersArray}
              renderItem={renderItem}
              keyExtractor={item => item.questionNo}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    height: isTablet() ? '80%' : '80%',
    // height: '100%',
    // paddingTop: scaleByHeight(37),
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: scaleByWidth(20),
    paddingTop: scaleByHeight(15),
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
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
    marginBottom: 5,
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

export default ProgressModal;
