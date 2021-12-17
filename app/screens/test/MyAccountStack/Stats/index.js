import React, { useState, useEffect } from 'react';
import { ImageBackground, View, FlatList, Dimensions } from 'react-native';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import statsButtonBG from '../../../assets/images/statsButtonBG.png';
import statsAchieverButtonBG from '../../../assets/images/statsAchieverButtonBG3x.png';
import { Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../../utils/config/I18n';
import { colors } from '../../../utils/config/colors';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatsResponse, requestStats } from '../../../actions/myAccountActions';
import Loader from '../../../globalComponents/Loader';
import { useFocusEffect } from '@react-navigation/core';

const width = Dimensions.get("window").width;

const data = [
  { id: 1, uri: `https://i.pravatar.cc/150?img=12` },
  { id: 2, uri: `https://i.pravatar.cc/150?img=13` },
  { id: 3, uri: `https://i.pravatar.cc/150?img=14` },
  { id: 4, uri: `https://i.pravatar.cc/150?img=15` },
  { id: 5, uri: `https://i.pravatar.cc/150?img=16` },
];

export default function Stats({ navigation }) {

  const dispatch = useDispatch();
  const myAccountReducer = useSelector(state => state.myAccountReducer);

  const [loading, setLoading] = useState(false)
  const [statsData, setStatsData] = useState(false)

  const renderItem = ({ item }) => {
    if (item.id == 5)
      return <Avatar.Image size={width < 350 ? 36 : 45} source={{ uri: item.uri }} />;
    return (
      <Avatar.Image
        style={styles.avatarOverlay}
        size={width < 350 ? 36 : 45}
        source={{ uri: item.uri }}
      />
    );
  };

  const StatsImageContainer = ({ title, content }) => {
    return (
      <View style={styles.statsImageView}>
        <ImageBackground
          source={statsButtonBG}
          resizeMode="cover"
          imageStyle={styles.imageStyleBorder}
          style={styles.imageContainer}>
          <View>
            <CustomText styles={styles.statsHeader} content={title} />
            <CustomText styles={styles.statsMetrics} content={content} />
          </View>
        </ImageBackground>
      </View>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchStats();
      console.log('34');
      return () => {

      }
    }, [])
  );
  const fetchStats = async () => {
    setLoading(true);
    await dispatch(requestStats())
  }

  useEffect(() => {
    setLoading(false);
    if (myAccountReducer?.statsFetched) {
      console.log(myAccountReducer?.stats, '--??');
      setStatsData(myAccountReducer?.stats?.data)
      dispatch(clearStatsResponse());
    } else if (myAccountReducer?.error) {
      showSnackBar(myAccountReducer?.error);
      dispatch(clearStatsResponse());
    }
  }, [myAccountReducer]);

  return (
    <View style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          navigation.goBack();
        }}
        headerLabel={I18n.t('myAccount.stats_header')}
      />
      <ScrollContainer>
        <View style={styles.containerWrapper}>
          <View style={styles.statsContainer}>
            <StatsImageContainer title={'Total Mins Learnt'} content={statsData?.totalLearningTime} />
            <StatsImageContainer title={'Completed Chapters'} content={statsData?.totalCompletedChapter} />
          </View>
          {/* <View style={styles.statsContainer}>
            <StatsImageContainer title={'Tests Attempted'} content={statsData?.testAttempted} />
            <StatsImageContainer title={'Questions Attempted'} content={statsData?.questionAttempted} />
          </View> */}
          {/* <View>
            <CustomText
              styles={styles.headerText}
              content={I18n.t('myAccount.top_achievers')}
            />

            <ImageBackground
              source={statsAchieverButtonBG}
              resizeMode="stretch"
              imageStyle={styles.imageBG}
              style={styles.imageContainer}>
              <View style={styles.avatarListWrapper}>
                <FlatList
                  horizontal
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  inverted
                />
              </View>

              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.gradientBlueOpacity, colors.gradientBlue]}
                style={styles.linearGradient}>
                <View style={styles.viewAllTextWrapper}>
                  <CustomText
                    styles={[styles.textColor, styles.textFlex]}
                    content={I18n.t('myAccount.view_all')}
                  />
                </View>
              </LinearGradient>
            </ImageBackground>
          </View> */}


        </View>
        <Loader loading={loading} />
      </ScrollContainer>
    </View>
  );
}
