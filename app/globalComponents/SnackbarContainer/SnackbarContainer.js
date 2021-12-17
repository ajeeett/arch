
import * as React from 'react';
import { View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import styles from './styles';
// import { closeSnackBar } from 'app/actions/snackbarAction';

export default function SnackbarContainer() {
  const dispatch = useDispatch();
  const visible = useSelector(state =>
    get(state, 'snackbarReducer.visible', false),
  );
  const message = useSelector(state =>
    get(state, 'snackbarReducer.message', ''),
  );
  const severity = useSelector(state =>
    get(state, 'snackbarReducer.severity', ''),
  );

  let color = '#000';

  switch (severity) {
    case 'warning':
      color = '#ff9800';
      break;
    case 'error':
      color = '#f44336';
      break;
    case 'success':
      color = '#4caf50';
      break;
    default:
      color = '#2196f3';
  }

  const onDismissSnackBar = () => {
    // dispatch(closeSnackBar());
  };

  return (

    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      wrapperStyle={styles.wrapperStyle}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
      style={{ backgroundColor: color }}>
      {message}
    </Snackbar>

  );
}
