import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { colors } from '../../utils/config/colors';
import VectorIcon from '../VectorIcon';

export const WebviewComponent = props => {
    let webViewRef = null;

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

    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <BackIcon />
            </View>
            <WebView
                source={{
                    uri: props.uri,
                }}
                startInLoadingState={true}
                style={[styles.webview, props.style,]}
                injectedJavaScript={props.injectedJavascript}
                onMessage={event => { }}
                onNavigationStateChange={props.navigationState}
                domStorageEnabled
                showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
                showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
                ref={ref => (webViewRef = ref)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    webview: {
        backgroundColor: '#fff',
        width: '100%',
        // height: 500,
    },
    closeIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
        marginRight: 5,
        zIndex: 100,
        elevation: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 25,
    }
});
