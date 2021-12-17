import { Alert } from 'react-native';
// import perf from '@react-native-firebase/perf';
export const showAlert = (title, alertMsg, cbOK, isCancel = false) => {
  let cancelObj = {
    text: 'Cancel',
    onPress: () => {
      Alert.cancelable = false;
    },
    style: 'cancel',
  };

  let okObj = {
    text: 'Allow',
    onPress: () => cbOK(),
  };

  let buttonsArr = [];
  buttonsArr.push(okObj);
  if (isCancel) {
    buttonsArr.push(cancelObj);
  }
  Alert.alert(title, alertMsg, buttonsArr, { cancelable: false });
};

export const replaceSpecialCharWithEmptyStr = str => {
  if (str && str !== '' && str !== ' ') {
    return str.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '');
  }
  return '';
};

export const customTrace = async () => {
  // Define & start a trace
  // const trace = await perf().startTrace('screens');
  // console.log('trace', trace);
  // // Stop the trace
  // await trace.stop();
};

export const getRequestPerf = async (url, method) => {
  // Define the network metric
  // const metric = await perf().newHttpMetric(url, method);
  // // Start the metric
  // await metric.start();

  // Perform a HTTP request and provide response information
  const response = await fetch(url);
  metric.setHttpResponseCode(response.status);
  metric.setResponseContentType(response.headers.get('Content-Type'));
  metric.setResponsePayloadSize(response.headers.get('Content-Length'));

  // Stop the metric
  await metric.stop();

  return response.json();
};
