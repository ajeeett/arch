import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const PageIndicator = ({data, position, color}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {data.map((_, i) => {
        let opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[styles.pageIndicator, {opacity, backgroundColor: color}]}
          />
        );
      })}
    </View>
  );
};
export default PageIndicator;

const styles = StyleSheet.create({
  pageIndicator: {
    height: 8,
    width: 8,
    backgroundColor: 'rgb(232, 232, 232)',
    margin: 5,
    borderRadius: 4,
    marginTop: 10,
  },
});
