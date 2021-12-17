import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Pdf from 'react-native-pdf';
import { styles } from './style';
import { showSnackBar } from '../../utils/Helper/helper';
import { colors } from '../../utils/config/colors';
import VectorIcon from '../VectorIcon';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';
import CustomTextBoxRound from '../CustomTextBoxRound';

export const PdfViewerComponent = props => {
  const source = {
    uri: props.uri,
    cache: true,
    method: "GET"
  };
  let ref = null;

  const handleButton = () => {
    if (props.totalPages >= props.pageNumber) ref.setPage(Number(props.pageNumber));
  };

  const BackIcon = () => (
    <VectorIcon
      groupName="MaterialCommunityIcons"
      name="close-circle-outline"
      size={25}
      color={colors.black}
      style={{}}
      handler={props.vectorBackHandler}
    />
  );

  const Inputs = () => (
    <>
      <View>
        <CustomText
          styles={[
            styles.responseText,
            props.orientation == 'PORTRAIT' ? styles.portText : styles.landText,
          ]}
          content={'Jump to the page'}
        />
      </View>
      <View
        style={[
          props.orientation == 'PORTRAIT' ? styles.portTextBox : styles.landTextBox,
        ]}>
        <CustomTextBoxRound
          placeholder={'Page no'}
          keyboardType={'numeric'}
          changeTextHandler={props.pageInputHandler}
          id="pageNumber"
          value={props.pageNumber}
          textInputStyle={styles.inputBox}
          sectionStyle={styles.sectionStyle}
        />
      </View>
      <View
        style={
          props.orientation == 'PORTRAIT' ? styles.portButton : styles.landButton
        }>
        <CustomButton
          btnText={styles.exploreText}
          btnStyle={styles.exploreBtn}
          toOpacity={styles.buttonOpacity}
          title={'GO'}
          handler={handleButton}
        />
      </View>
    </>
  );

  const PdfContent = ({ style }) => (
    <>
      <Pdf
        source={source}
        onLoadComplete={props.pdfLoadComplete}
        onPageChanged={props.pdfPageChanged}
        onError={props.pdfError}
        style={style}
        ref={pdf => (ref = pdf)}
        fitPolicy={2}
      />
      <View style={styles.height} />
    </>
  );

  const LandscapeMode = () => {
    return (
      <View style={styles.containerLandscape}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
          enabled={Platform.OS === 'ios' ? true : false}>
          <View style={styles.iconLandscape}>
            <BackIcon />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.inputLandscape}>
              <Inputs />
            </View>
            <View style={styles.pdfLandscape}>
              <PdfContent style={styles.pdfStyle} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };

  const PortraitMode = () => {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
          enabled={Platform.OS === 'ios' ? true : false}>
          <View style={styles.closeIcon}>
            <BackIcon />
          </View>
          <View style={styles.inputContainer}>
            <Inputs />
          </View>
          <View style={styles.flex}>
            <PdfContent style={styles.pdf} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };

  return (
    <>
      {props.orientation && props.orientation == `PORTRAIT` ? (
        <PortraitMode />
      ) : (
        <LandscapeMode />
      )}
    </>
  );
};
