import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import styles from './style';

export default function Cards(props) {
  let Container = props.handler ? TouchableOpacity : View;
  let Content1Container = props.content1Handler ? TouchableOpacity : View;
  return (
    <Container
      onPress={() => (props.handler ? props.handler() : {})}
      style={[styles.container, props.containerStyles]}>
      <View key={props.key ? props.key : 'Cards'}>
        {props.headingContent && (
          <View style={[styles.heading, props.customHeadingView]}>
            <CustomText
              content={props.headingContent}
              styles={[styles.customHeading, props.customHeading]}
            />
            <View style={[styles.subHeading, props.customSubHeading]}>
              <CustomText
                content={props.subHeadingContent}
                styles={[styles.customSubHeading, props.customSubHeading]}
              />
            </View>
          </View>
        )}
        {props.rowContent ? (
          <View style={[styles.rowContent, props.rowContentStyle]}>
            <Content1Container
              style={[styles.content, props.customContent]}
              onPress={props.content1Handler && props.content1Handler}>
              <CustomText
                content={props.content1}
                styles={[styles.customContent, props.contentStyles]}
                ellipseMode={props.ellipseMode}
                lineNumbers={props.lineNumbers}
              />
            </Content1Container>
            <View style={[styles.content, props.customContent2]}>
              <CustomText
                content={props.content2}
                styles={[styles.customContent, props.contentStyles2]}
                lineNumbers={props.lineNoContent2}
                handler={props.content2Handler}
              />
            </View>
          </View>
        ) : (
          <View style={[styles.content, props.customContent]}>
            <CustomText
              content={props.content}
              styles={[styles.customContent, props.contentStyles]}
              ellipseMode={props.ellipseMode}
              lineNumbers={props.lineNumbers}
            />
          </View>
        )}
        {props.subContent && (
          <View style={[styles.subContent, props.customSubContent]}>
            {props.subContent instanceof Object &&
            props.subContent instanceof Array ? (
              props.subContent.map(item => {
                return (
                  <CustomText
                    content={item}
                    styles={[styles.customSubContent, props.customSubContent]}
                  />
                );
              })
            ) : typeof props.subContent === 'string' ? (
              <CustomText
                content={props.subContent}
                styles={[styles.customSubContent, props.customSubContent]}
              />
            ) : (
              props.subContent
            )}
          </View>
        )}
      </View>
    </Container>
  );
}
