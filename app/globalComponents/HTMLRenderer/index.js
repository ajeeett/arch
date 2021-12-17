import React, { Component } from 'react';
import {
  // Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

const height = Dimensions.get('window').height;

export default function HTMLRenderer({
  html,
  tagsStyles,
  baseFontStyle,
  imagesMaxWidth,
  containerStyle,
}) {

  const {width} = useWindowDimensions();
  const IGNORED_TAGS = [
    'head',
    'scripts',
    'audio',
    'video',
    'track',
    'embed',
    'object',
    'param',
    'source',
    'canvas',
    'noscript',
    'caption',
    'col',
    'colgroup',
    'button',
    'datalist',
    'fieldset',
    'form',
    'input',
    'label',
    'legend',
    'meter',
    'optgroup',
    'option',
    'output',
    'progress',
    'select',
    'textarea',
    'details',
    'diaglog',
    'menu',
    'menuitem',
    'summary',
  ];

  

  return (
    <HTML
      tagsStyles={tagsStyles}
      onPress={(evt, href) => {
        Linking.openURL(href);
      }}
      contentWidth={width}
      source={{html: html}}
      imagesMaxWidth={width * 0.9}
      ignoredTags={IGNORED_TAGS}
      baseFontStyle={baseFontStyle}
      containerStyle={containerStyle}
    />
  );
}
