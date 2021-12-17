import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, Platform } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './app/navigation';
import configureStore from './app/store/configureStore';
// import { fcmService } from './FCMService';
// import { localNotificationService } from './LocalNotificationService';
import { YellowBox } from 'react-native';

const { persistor, store } = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        // SplashScreen.hide();
      }, 3000);
    } else {
      // SplashScreen.hide();
    }
    return () => {
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          {/* <MenuProvider> */}
          <StatusBar backgroundColor="#0179FA" barStyle="light-content" />
          <Navigator />
          {/* </MenuProvider> */}
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
