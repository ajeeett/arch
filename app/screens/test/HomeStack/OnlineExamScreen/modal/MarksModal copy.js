import React, { useState } from 'react';
import {
  Text, View, StyleSheet, Modal, Pressable, FlatList, Dimensions,
  Animated, TouchableOpacity
} from 'react-native';
import { isTablet } from 'react-native-device-info';
import CustomText from '../../../../globalComponents/CustomText';
import { fontRegular, fontSemiBold } from '../../../../utils/config/fonts';
import { colors } from '../../../../utils/config/colors';
import { scaleByHeight, scaleByWidth, width } from '../../../../utils/config/theme';


let color = [colors.white, colors.lightGray];

const MarksModal = props => {
  const { width, height } = Dimensions.get("screen");
  const [alignment] = useState(new Animated.Value(0));
  const [isSheetClosed, setSheetCloseStatus] = useState(true);

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

  function bringUpActionSheet() {
    setSheetCloseStatus(false);
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function hideTheActionSheet() {
    setSheetCloseStatus(true);
    Animated.timing(alignment, {
      toValue: 0,
      useNativeDriver: false,
      duration: 500,
    }).start();
  }

  const actionSheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [height - 70, height * 0.5],
  });

  const actionSheetStyle = {
    bottom: actionSheetInterpolate,
  };

  return (
    <Animated.View style={[styles.sheetStyle, actionSheetStyle]}>
      <View style={{ flex: 1 }}>{props.child}</View>
      <View>

        <View
          style={{
            height: 70,
            width: 300,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "white",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (!isSheetClosed) {
                hideTheActionSheet();
              } else {
                bringUpActionSheet();
              }
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                height: 3,
                width: 60,
              }}
            ></View>
          </TouchableOpacity>
        </View>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  grabber: {
    width: 60,
    // borderTopWidth: 5,
    // marginTop: 5,
    backgroundColor: "black",
    borderRadius: 4,
    borderTopColor: "black",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  sheetStyle: {
    height: "50%",
    width: width,
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // zIndex: 9998,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
});

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

export default MarksModal;
