import React, { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { AWS_FILES_BASE_URL, DOCUMENT_VIEWER_URL } from '../../../../api/APIConstants';
import { WebviewComponent } from '../../../../globalComponents/Webview';

export default function DocViewer({ route, navigation }) {
    const fileUrl = `${DOCUMENT_VIEWER_URL}${AWS_FILES_BASE_URL}${route?.params?.source.replace(/\\/g, '/')}`;
    console.log(`URL for docs => ${fileUrl}`);

    const [orientation, setOrientation] = useState('');
    const injectedJSFunction = `
    function removeHeaderFooter() {
    const elements= document.getElementsByClassName('ndfHFb-c4YZDc-q77wGc');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    const element= document.getElementsByClassName('ndfHFb-c4YZDc-Wrql6b');
    while(element.length > 0){
        element[0].parentNode.removeChild(element[0]);
    }
    }; 
    removeHeaderFooter();`

    // listen to the orientation change
    const listenOrientationChange = orientation => {
        console.log(`Listening to the orientation => ${orientation}`);
        if (orientation == 'LANDSCAPE-LEFT') {
            setOrientation('LANDSCAPE-LEFT');
        } else if (orientation == 'PORTRAIT') {
            setOrientation('PORTRAIT');
        } else if (orientation == 'LANDSCAPE-RIGHT') {
            setOrientation('LANDSCAPE-RIGHT');
        }
    };

    // hide bottom navigation and handle orientation
    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,
        });

        Orientation.unlockAllOrientations();
        // let initial = Orientation.getInitialOrientation();
        // console.log(`Initial Orientation is ${initial}`);
        // setOrientation(initial);
        Orientation.addOrientationListener(listenOrientationChange);

        return () => {
            parent.setOptions({
                tabBarVisible: true,
            });
            Orientation.removeAllListeners(listenOrientationChange);
        };
    }, []);

    // back button
    const backHandler = () => {
        Orientation.lockToPortrait();
        navigation.goBack();
    };

    return (
        <WebviewComponent
            uri={fileUrl}
            navigation={navigation}
            vectorBackHandler={backHandler}
            injectedJavascript={injectedJSFunction}
            navigationState={navEvent => console.log(navEvent)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        />
    );
}
