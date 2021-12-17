import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PageIndicator from './PageIndicator';
import {
  height,
  scaleByHeight,
  scaleByWidth,
  scaleHeight,
  width,
} from './../../utils/config/theme';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { colors, fontBlack } from './../../utils/config/colors';
import CardBg from '../CardBg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { isTablet } from 'react-native-device-info';
import RoundButton from '../RoundButton';
import CustomText from '../CustomText';
import { fontBold, fontRegular, fontSemiBold } from '../../utils/config/fonts';
import PlayButton from '../../assets/svg/PlayButton';
import ProgressHorizontal from '../ProgressHorizontal';
import ProgressHorizontalSmall from '../ProgressHorizontalSmall';

const FeatureImagesSwiper = (props) => {
  var scrollX = new Animated.Value(0);
  var position = Animated.divide(scrollX, width - 100);
  const scrollRef = React.useRef(null);

  const [navigateToNextScreen, setNavigateToNextScreen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [valid, setValid] = useState(true)

  const dummyData = [{ 'name': 'Test' }]


  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current?.getCurrentIndex();
    if (currentIndex == 1) {
      setIndex(currentIndex);
    }
    setIndex(currentIndex);
  };

  setTimeout(() => {
    getCurrentIndex();
  }, 500);

  const renderItem = (item, index) => {
    // console.log(item?.courseImage, '--featureimg');
    return (
      <View key={item.item} style={styles.itemOuter}>
        <View
          style={styles.sliderImage}
        >
          <View style={styles.viewPadding}>
            <View style={styles.headingBtn}>
              <CustomText styles={styles.headingTextRound} content={item?.productName} />
            </View>
            <CustomText styles={styles.continueText} content='Continue Studying' />

            <View style={styles.continueStudyContainer}>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 10, width: '45%' }}
                onPress={() => props.goToVideo(item)}
                activeOpacity={0.8}>
                {valid ? <Image style={styles.imageBG}
                  onError={() => {
                    setValid(false)
                  }}
                  source={item?.courseImage ? {
                    uri:
                      item?.courseImage
                  } :
                    require('./../../assets/images/thumnailVid.png')} /> :
                  <Image style={styles.imageBG} source={require('./../../assets/images/thumnailVid.png')} />
                }
                <PlayButton width={isTablet() ? 60 : 30} height={isTablet() ? 60 : 20} style={{
                  position: 'absolute',
                }} />
                {isTablet() ?
                  <View style={{ width: '95%', position: 'absolute', bottom: 5 }}>
                    <ProgressHorizontal progress={Math.floor(item?.progressPercentage)} />

                  </View> :
                  <View style={{ width: '90%', position: 'absolute', bottom: 2, }}>
                    <ProgressHorizontalSmall progress={Math.floor(item?.progressPercentage)} />

                  </View>
                }

              </TouchableOpacity>
              <View>
                <CustomText styles={styles.topicText} content={item?.lastSubjectName} />
                <CustomText styles={styles.chapterText} content={item?.lastChapterName} />

              </View>

            </View>
            <RoundButton
              btnText={styles.exploreText}
              btnStyle={styles.exploreCourseBtn}
              title={'COURSE HOME'}
              handler={() => props.goToVideo(item)}
              disabled={false}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderShopifyItem = (item, index) => {
    return (
      <View key={item.item} style={styles.itemOuter}>
        <View
          style={styles.sliderImage}
        >
          <View style={styles.viewPaddingShopify}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '60%', }}>
                <View style={{ height: isTablet() ? '60%' : '55%' }}>
                  <CustomText styles={styles.topicTextShop} content={'Top Courses'} />
                  <CustomText styles={styles.subTopicText} content={'Over 50+ available courses.\nSubscribe yourself.'} />

                </View>
                <View style={{}}>
                  <RoundButton
                    btnText={styles.exploreText}
                    btnStyle={styles.exploreBtn}
                    title={'Explore'}
                    handler={() => props.goToCourses(item)}
                    disabled={false}
                  />
                </View>

              </View>
              <View style={{ width: '40%' }}>
                <Image resizeMode={'contain'} style={{ height: '100%', width: '100%' }} source={require('./../../assets/images/shopifyZero.png')} />
              </View>
            </View>

          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {props?.data?.length == 0 ? <SwiperFlatList
        ref={scrollRef}
        renderItem={({ item, index }) => renderShopifyItem(item, index)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={100}
        index={0}
        // autoplay={false}
        // autoplayDelay={5}
        autoplayLoop={false}
        data={dummyData}
        paginationStyle={styles.pagenationStyle}
        currentIndex={() => props?.currentIndex(index)}
      /> :
        <SwiperFlatList
          ref={scrollRef}
          renderItem={({ item, index }) => renderItem(item, index)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={100}
          index={0}
          // autoplay={false}
          // autoplayDelay={5}
          autoplayLoop={false}
          data={props?.data}
          paginationStyle={styles.pagenationStyle}
          currentIndex={() => props?.currentIndex(index)}
        />}

      <View
        style={styles.pageIndicatorContainer}>
        <PageIndicator data={props?.data?.length > 0 ? props?.data : dummyData} position={position} color={colors.appBlue} />
      </View>
    </View>
  );
};

export default FeatureImagesSwiper;

const styles = StyleSheet.create({
  container: {
    height: isTablet() ? 340 : 200,//handle tab case as well
    // width: '100%',
    backgroundColor: 'white',
    // borderWidth: 1,
    marginStart: 20,
    marginEnd: 20,
    paddingStart: 5,
    paddingEnd: 5,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    overflow: 'hidden'
  },
  itemOuter: {
    // paddingStart: isTablet() ? 96 : 20, //handle tab case as well
    // paddingEnd: isTablet() ? 100 : 25, //handle tab case as well
    width: width - 50,
    height: isTablet() ? 340 : 200,

  },
  paginationStyle: {
    width: '100%',
    height: isTablet() ? 340 : 200,
    position: 'absolute',
    bottom: 0,
  },
  pagination: {
    borderRadius: 2,
  },

  sliderImage: {
    width: '100%',
    height: isTablet() ? 340 : 200,
    borderRadius: 20,
    // backgroundColor: '#090'
    // marginTop: scaleByHeight(42),
  },
  list2ItemWraper: {
    width: '80%',
    height: height,
  },
  heading: {
    bottom: 1,
    color: colors.black,
    fontSize: scaleByWidth(20),
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingHorizontal: 12,
    // fontFamily: fontExtraBold,
  },
  text: {
    color: "#000",
    alignSelf: 'center',
    fontSize: scaleByWidth(12),
    textAlign: 'center',
    // fontFamily: fontMedium,
    width: width * 0.755,
    lineHeight: Math.floor(scaleByHeight(20)),
  },
  textSubheadBold: {
    color: '#000',
    fontSize: scaleByWidth(12),
    textAlign: 'center',
    width: scaleByWidth(340),
    lineHeight: scaleByHeight(20),
    marginTop: scaleByHeight(10),
  },
  textBold: {
    // fontFamily: fontBold,
  },
  topMargin: {
    marginTop: scaleHeight * 20,
  },
  paginationContainer: {
    marginBottom: scaleByHeight(108),
    alignItems: 'center',
  },
  headingBtn: {
    backgroundColor: colors.appBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignSelf: 'flex-start'
  },
  headingTextRound: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fontRegular
  },
  continueText: {
    fontSize: 14,
    color: colors.appBlue,
    fontFamily: fontBold,
    marginTop: isTablet() ? 15 : 2
  },
  topicText: {
    fontFamily: fontSemiBold,
    fontSize: isTablet() ? 18 : 16,
    color: colors.appBlue
  },
  topicTextShop: {
    fontFamily: fontSemiBold,
    fontSize: isTablet() ? 18 : 16,
    color: colors.appBlue
  },
  subTopicText: {
    fontFamily: fontSemiBold,
    fontSize: isTablet() ? 18 : 16,
    color: colors.black,

  },
  chapterText: {
    fontFamily: fontSemiBold,
    fontSize: 12,
    color: colors.appBlue
  },
  exploreText: {
    fontFamily: fontBold,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3,
    color: colors.white,
    paddingBottom: 7.5,
  },
  exploreCourseBtn: {
    borderRadius: 50,
    backgroundColor: colors.appBlue,
    width: '100%',
    height: isTablet() ? 50 : 35,
    marginVertical: isTablet() ? 15 : 10
  },
  exploreBtn: {
    borderRadius: 50,
    backgroundColor: colors.appBlue,
    width: '80%',
    height: isTablet() ? 50 : 35,
    marginBottom: isTablet() ? 15 : 10,
    marginTop: isTablet() ? 35 : 30,
  },
  viewPadding: {
    paddingHorizontal:
      isTablet() ? 20 : 5,
    paddingVertical: isTablet() ? 20 : 8,
  },
  viewPaddingShopify: {
    paddingHorizontal:
      isTablet() ? 20 : 5,
    paddingVertical: isTablet() ? 20 : 8,
  },
  continueStudyContainer: {
    width: '100%',
    height: isTablet() ? '50%' : '45%',
    flexDirection: 'row',
    marginTop: isTablet() ? 15 : 5,
  },
  imageBG: {
    width: '100%', height: '100%',
    borderRadius: 10
  },
  pageIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isTablet() ? 10 : 1,
  },
  pagenationStyle: { borderWidth: 1 }
});
