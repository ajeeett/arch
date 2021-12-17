/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { ZoomUs, ZoomEmitter } from 'react-native-zoom-us';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Text,
    useColorScheme,
    View,
    NativeEventEmitter
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export const ZoomClass = () => {

    const [correctCount, setCorrectCount] = useState(0)
    const [totalCount, setTotalCount] = useState(2)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [answerCorrect, setAnswerCorrect] = useState(false)


    const answer = correct => {
        const nextState = { answered: true };
        if (correct) {
            nextState.correctCount = state.correctCount + 1;
            nextState.answerCorrect = true;
        } else {
            nextState.answerCorrect = false;
        }

        this.setState(
            state => {
                const nextState = { answered: true };

                if (correct) {
                    nextState.correctCount = state.correctCount + 1;
                    nextState.answerCorrect = true;
                } else {
                    nextState.answerCorrect = false;
                }

                return nextState;
            },
            () => {
                setTimeout(() => this.nextQuestion(), 750);
            }
        );
    };
    //l
    const nextQuestion = () => {
        this.setState(state => {
            const nextIndex = state.activeQuestionIndex + 1;

            if (nextIndex >= state.totalCount) {
                return this.props.navigation.popToTop();
            }

            return {
                activeQuestionIndex: nextIndex,
                answered: false
            };
        });
    };

    useEffect(() => {

        initializeZoom();
        const meetingEventEmitter = new NativeEventEmitter(
            RNZoomUsBridgeEventEmitter,
        );
        const endedSubscription = meetingEventEmitter.addListener(
            'meetingEnded',
            result => {
                console.log('Meeting Ended: ', result);
                if ('error' in result) {
                    Alert.alert(
                        'Error Joining',
                        'One of your inputs is invalid.',
                        [{ text: 'OK', onPress: () => null }],
                        { cancelable: false },
                    );
                }
            },
        );
        return () => {
            endedSubscription.remove();

        }
    }, [])
    const initializeZoom = async () => {
        ZoomUs.initialize({
            clientKey: 'CKOsmJUX1uyX3HYyKZLZA95FCgmcBvGl9cJl',
            clientSecret: 'MjIqYpjou0ErYxjTnN2juFzXzItoBXxYl4QT',
            enableCustomizedMeetingUI: true,

        }).then(res => {
            console.log(res);


        }).catch(err => {
            console.log(err);
        });
    }

    const joinMeeting = () => {
        ZoomUs.joinMeeting({
            userName: 'Johny',
            meetingNumber: '4531687771',
            password: '6tDREd',
            // participantID: 'our-unique-id',
            noAudio: true,
            noVideo: true,
            noTextMeetingId: true,
            meetingTitleHidden: true,
            noTitlebar: false,
            showMeetingPassword: false
        })
    }

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <TouchableOpacity style={{
                alignSelf: 'center',
                padding: 50,
                marginTop: 50,
                backgroundColor: '#08F886'
            }} onPress={joinMeeting}>
                <Text>joinMeeting</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});


