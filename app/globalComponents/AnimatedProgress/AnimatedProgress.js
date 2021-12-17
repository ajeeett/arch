import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import { fontRegular } from '../../utils/config/fonts';
import { scaleByHeight } from '../../utils/config/theme';


const AnimatedProgress = (props) => {
  const size = props.size;
  const strokeWidth = props.strokeWidth;
  const text = props.progressText;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = props.progress;

  return (
    <View style={{ margin: 10 }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={'#f2f2f2'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={props.strokeColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />

        <SVGText
          fontSize={props.textSize ? props.textSize : '16'}
          x={size / 2}
          y={size / 2 + 5}
          textAnchor="middle"
          fontFamily={fontRegular}
          fill={props.textColor ? props.textColor : '#333333'}>
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleByHeight(200),
    height: scaleByHeight(200),
    borderWidth: scaleByHeight(20),
    borderRadius: 100,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLayer: {
    width: scaleByHeight(200),
    height: scaleByHeight(200),
    borderWidth: scaleByHeight(20),
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '-135deg' }],
  },
  offsetLayer: {
    width: scaleByHeight(200),
    height: scaleByHeight(200),
    borderWidth: scaleByHeight(20),
    position: 'absolute',
    borderRadius: 100,
    borderColor: '#3498db',
    transform: [{ rotateZ: '-135deg' }],
  },
});

export default AnimatedProgress;
