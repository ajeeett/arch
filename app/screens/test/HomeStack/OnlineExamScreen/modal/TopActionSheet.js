import React, {useState, useImperativeHandle} from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {StyleSheet, View, Dimensions, Animated, Pressable} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default TopActionSheet = React.forwardRef((props, ref) => {
  const [alignment] = useState(new Animated.Value(0));
  const [isSheetOpened, setTopSheetStatus] = useState(false);
  const [blurViewStatus, setBlurViewStatus] = useState(false);

  //to be used when we need to call child functions from parent component
  useImperativeHandle(ref, () => ({
    bringUpActionSheet() {
      showSheet();
    },
    hideTheActionSheet() {
      hideSheet();
    },
  }));

  //Swipe gesture
  const onSwipe = gestureName => {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    console.log('called swipe in component;', gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        hideSheet();
        break;
      case SWIPE_DOWN:
        break;
      default:
        hideSheet();
    }
  };

  function showSheet() {
    props.onOpenSheet();
    setTopSheetStatus(true);
    setBlurViewStatus(true);
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function hideSheet() {
    props.onHideSheet();
    setBlurViewStatus(false);

    Animated.timing(alignment, {
      toValue: 0,
      useNativeDriver: false,
      duration: 500,
    }).start(() => {
      setTopSheetStatus(false);
    });
  }

  const actionSheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const actionSheetStyle = {
    bottom: actionSheetInterpolate,
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View
      style={{
        position: 'absolute',
        height: isSheetOpened ? height : 0,
        width: width,
        backgroundColor: blurViewStatus ? 'rgba(0,0,0,0.5)' : 'transparent',
      }}>
      <Animated.View style={[styles.sheetStyle, actionSheetStyle]}>
        <View style={{flex: 1, width: '100%'}}>
          <View style={styles.backGroundContainer}>
            <View style={{flex: 1, marginTop: 10, paddingTop: 10}}>
              {props.child}
            </View>
            <View>
              <GestureRecognizer
                onSwipe={(direction, state) => onSwipe(direction, state)}
                config={config}>
                <View style={styles.gestRec}>
                  <View style={styles.closeIcon}></View>
                </View>
              </GestureRecognizer>
            </View>
          </View>
          <Pressable onPress={() => hideSheet()}>
            <View
              style={{height: '50%', backgroundColor: 'transparent'}}></View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  grabber: {
    width: 60,
    backgroundColor: 'black',
    borderRadius: 4,
    borderTopColor: 'black',
  },

  sheetStyle: {
    height: height,
    width: width,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    // elevation: 10,
  },
  backGroundContainer: {
    height: '40%',
    // backgroundColor: '#E8E8E8',
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    right: 0,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  gestRec: {
    height: 25,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#E8E8E8',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  closeIcon: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 3,
    width: 60,
  },
  blurContainerStyle: {},
});
