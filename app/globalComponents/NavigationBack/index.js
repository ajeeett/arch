import React from 'react';
import VectorIcon from '../VectorIcon';
import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';

export default function NavigationBack(props) {
  const backHandler = () => {
    if (props.cleanup) props.cleanup();
    props.IconAction();
  };
  return (
    <VectorIcon
      groupName={'MaterialIcons'}
      name="arrow-back"
      size={30}
      color={colors.white}
      handler={backHandler}
      style={styles.leftIcon}
    />
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 99999999,
  },
});
