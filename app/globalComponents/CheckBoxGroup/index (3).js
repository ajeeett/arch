import React, { useState } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import CustomText from '../../../globalComponents/CustomText';
import Header from '../../../globalComponents/Header/index';
import Topic1Image from '../../../assets/images/topic1.png';
import Topic2Image from '../../../assets/images/topic2.png';
import Topic3Image from '../../../assets/images/topic3.png';
import PlayButton from '../../../assets/svg/PlayButton';
import I18n from '../../../utils/config/I18n';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { CheckBoxGroup } from '../../../globalComponents/CheckBoxGroup';

const sampleText =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
const footerContent = '3 Topics • 57 mins';

export default function Downloads({ navigation }) {
  const CustomImageContainer = ({ source }) => {
    return (
      <Image
        source={source}
        style={styles.videoImage}
        resizeMode="cover"
        width={88}
        height={88}
      />
    );
  };


  const DownloadItem = ({ imageSource, header, content, footer }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <CustomImageContainer source={imageSource} />
          <PlayButton />
        </View>
        <View style={styles.itemWrapper}>
          <CustomText styles={styles.headerText} content={header} />
          <CustomText lineNumbers={4} styles={styles.contentText} content={content} />
          <View style={styles.footerTextView}>
            <CustomText styles={styles.footerText} content={footerContent} />
          </View>
        </View>
      </View>
    );
  };

  const toggleCheckbox = (id, index) => {
    console.log("toggleCheckbox", id, index);
    const checkboxData = [...checkboxes];
    checkboxData[index].checked = !checkboxData[index].checked;
    console.log('Checkboxdata', checkboxData);
    setCheckboxes(checkboxData);
  }

  return (
    <View style={styles.container}>
      <Header
        leftGroupName={'Ionicons'}
        leftIcon={'arrow-back'}
        leftAction={() => {
          navigation.goBack();
        }}
        headerLabel={I18n.t('myAccount.download_header')}
      />

      <ScrollContainer>
        <View style={styles.containerWrapper}>

          <CheckBoxGroup
            checkboxes={checkboxes}
            toggleCheckbox={toggleCheckbox}
          />
        </View>
      </ScrollContainer>
    </View>
  );
}
