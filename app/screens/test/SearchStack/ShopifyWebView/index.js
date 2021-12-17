import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

export default function ShopifyWebView({ navigation, route }) {
    const { course } = route.params;
    console.log(`from searchCourseDetailScreen => `, course);

    const [pageUrl, setPageURL] = useState('');

    // useEffect(() => {
    //     if (pageUrl.includes('checkouts')) {
    //         console.log(`URL has the word checkout ===============!!!!!`);
    //         // setTimeout(() => {navigation.navigate('Search')}, 5000)
    //     }
    // }, [pageUrl])

    const updatePageState = (value) => {
        setPageURL(value.url);
        console.log(`URL Changed from => ${value.url}`)
        console.log(`Title => ${value.title}`)
    }

    return (
        <WebView
            source={{
                uri: `${course?.node?.onlineStorePreviewUrl || course?.onlineStorePreviewUrl}`,
                // headers: {
                //     "X-Shopify-Access-Token": "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"
                // }
            }}
            onNavigationStateChange={updatePageState}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            style={{ resizeMode: 'cover', width: '100%', height: 500 }}
            scalesPageToFit={true}
        />
    );
}