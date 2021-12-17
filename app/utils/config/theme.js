import { Dimensions } from 'react-native';
import { hasNotch, isTablet } from 'react-native-device-info';

// export const isTablet = () => {
//   let pixelDensity = PixelRatio.get();
//   const adjustedWidth = screenWidth * pixelDensity;
//   const adjustedHeight = screenHeight * pixelDensity;
//   if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
//     return true;
//   } else
//     return (
//       pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
//     );
// };

export const isTab = isTablet();

export const height = hasNotch()
  ? Math.floor(Dimensions.get('window').height - 20)
  : Math.floor(Dimensions.get('window').height);
export const width = Math.floor(Dimensions.get('window').width);

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 812;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

// console.log('height-' + height, 'width-' + width);

export const scaleByHeight = (value) => {
  return Math.floor(scaleHeight * value);
};
export const scaleByWidth = (value) => {
  return Math.floor(scaleWidth * value);
};


export { scale, scaleWidth, scaleHeight };
