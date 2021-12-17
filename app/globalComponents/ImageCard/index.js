import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import styles from './style';
import AutoHeightImage from 'react-native-auto-height-image';
import VectorIcon from 'app/globalComponents/VectorIcon';

export default function ImageCard(props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentPadding, setContentPadding] = useState(0);
  const imageWidth = props.imageWidth || 120;
  const Type = props.action ? TouchableOpacity : View;

  useEffect(() => {
    setContentPadding(imageWidth - (imageWidth * 10) / 100);
  }, [containerWidth]);

  return (
    <Type
      style={[styles.container, props.cardStyles]}
      onLayout={event => {
        var { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
      onPress={props.action}>
      <View style={styles.imageStylesContainer}>
        {props.isNotImage ? (
          <View style={styles.calendarCard}>
            <View style={styles.rowCalendar}>
              <View style={styles.monthName}>
                <CustomText content={props.month} styles={styles.customMonth} />
              </View>
              <View style={styles.dayName}>
                <CustomText content={props.day} styles={styles.customDay} />
              </View>
            </View>
          </View>
        ) : (
          <AutoHeightImage
            width={imageWidth}
            resizeMode="contain"
            source={
              props.image || require('../../assets/images/thumbnail-square.png')
            }
            style={styles.imageStyles}
          />
        )}
        {props.isLive && (
          <View style={styles.liveOuterContainer}>
            <View style={styles.liveInnerContainer}>
              <VectorIcon
                groupName={'Entypo'}
                name={'dot-single'}
                size={18}
                color={'grey'}
                style={styles.iconColorRed}
              />
              <CustomText
                content={'LIVE'}
                styles={styles.liveText}
              />
            </View>
          </View>
        )}
      </View>

      <View
        style={[
          styles.cardContent,
          { marginLeft: contentPadding },
          props.cardContentStyle,
        ]}>
        <View style={[styles.heading, props.headingStyle]}>
          {props.heading && (
            <CustomText
              content={props.heading}
              styles={styles.headingContent}
            />
          )}
          {props.subHeading && <View style={styles.subHeading} />}
          {props.subHeading && (
            <CustomText
              content={props.subHeading}
              styles={styles.subHeadingContent}
            />
          )}
        </View>
        {props.content && (
          <CustomText
            content={props.content}
            styles={[styles.contentStyle, props.contentStyle]}
          />
        )}
        {props.subContent && (
          <CustomText
            content={props.subContent}
            styles={[styles.subContentStyle, props.subContentStyle]}
          />
        )}
      </View>
    </Type>
  );
}

// * Props Used

// cardStyles: {}

// imageWidth: {100}
// image: {require('app/assets/images/thumbnail.jpg')}
// imageStyles: {}

// cardContentStyle: {}
// heading: 'Heading'

// subHeading="subheading"

// content="Biomolecules, Polymers & poc Class 02"

//isLive = default: false. true , in case of live class going on

//isNotImage = default: false, true in case you want something else than image
