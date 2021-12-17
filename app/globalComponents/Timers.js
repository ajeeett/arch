import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from 'react-compound-timer';
import { fontBold, fontRegular } from '../utils/config/fonts';

export default function Timers(props) {
  return (
    <Timer
      initialTime={props.initialTime}
      lastUnit="d"
      direction="backward"
      formatValue={(value) => `${(value < 10 ? `0${value}` : value)} `}
      checkpoints={[
        {
          time: 0,
          callback: props.callback,
        },
      ]}>
      {() => (
        <View style={props.styleOut}>
          <View style={props.timerOuter ? props.timerOuter : styles.timerOuter}>
            {props.hideDays ? null :
              <View style={props.timerStyle ? props.timerStyle : styles.timerStyle}>
                <Text style={props.timerTextStyle ? props.timerTextStyle : styles.timerTextStyle}>
                  <Timer.Days />
                </Text>
                <Text style={props.timerExternalText ? props.timerExternalText : styles.timerExternalText}>DAYS</Text>
              </View>}
            <View style={props.timerStyle ? props.timerStyle : styles.timerStyle}>
              <Text style={props.timerTextStyle ? props.timerTextStyle : styles.timerTextStyle}>
                <Timer.Hours />
              </Text>
              <Text style={props.timerExternalText ? props.timerExternalText : styles.timerExternalText}>Hrs</Text>
            </View>
            <View style={props.timerStyle ? props.timerStyle : styles.timerStyle}>
              <Text style={props.timerTextStyle ? props.timerTextStyle : styles.timerTextStyle}>
                <Timer.Minutes />
              </Text>
              <Text style={props.timerExternalText ? props.timerExternalText : styles.timerExternalText}>Mins</Text>
            </View>
            <View style={props.timerStyle ? props.timerStyle : styles.timerStyle}>
              <Text style={[props.timerTextStyle ? props.timerTextStyle : styles.timerTextStyle]}>
                <Timer.Seconds />
              </Text>
              <Text style={props.timerExternalText ? props.timerExternalText : styles.timerExternalText}>Secs</Text>
            </View>
          </View>
        </View>
      )}
    </Timer>
  );
}

const styles = StyleSheet.create({
  timerStyle: {
    // flexDirection: 'column',
    width: 50,
  },
  timerOuter: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  timerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    opacity: 1,
    fontFamily: fontBold,
    color: '#2A2A2A',
  },
  timerExternalText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#2A2A2A',
    fontFamily: fontRegular,
    opacity: 1,
  },
  timerText: {
    color: '#EE5636',
    fontSize: 12,
  },
});
