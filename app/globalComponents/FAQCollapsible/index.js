import React, { useRef, useEffect } from 'react';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/config/colors';
import styles from './style';
import { List } from 'react-native-paper';
import { fontBold, fontSemiBold, fontRegular } from '../../utils/config/fonts';
import OnlineGreen from '../../assets/svg/OnlineGreen';
import DropDownIcon from '../../assets/svg/DropDownIcon';
import RoundButton from '../RoundButton';
import AdditionalResCard from '../AdditionalResCard';
import { Transition, Transitioning } from 'react-native-reanimated';

export default function FAQCollapsible(props) {

    console.log(props.data, '----Teststs');

    const transition = (
        <Transition.Together>
            {/* <Transition.In type={'slide-bottom'} durationMs={200} />
            <Transition.Change />
            <Transition.Out type={'slide-bottom'} durationMs={200} /> */}
        </Transition.Together>
    )

    // const ref = React.useRef;
    const refe = React.useRef();
    useEffect(() => {
        // console.warn('cc', refe.current)
    }, [])

    return (
        <Transitioning.View
            ref={refe}
            transition={transition}>
            {props.data.map(({ question, answerCollection, thirdSub }, index) => {
                return (
                    <View key={question} style={styles.listContainer}>
                        <View style={[styles.card, styles.headerText]}>
                            <TouchableOpacity activeOpacity={0.7}
                                style={styles.toStyle} onPress={() => {
                                    refe.current.animateNextTransition();
                                    if (index == props.currentIndex) {
                                        props.setCurrentIndex(null);
                                    } else {
                                        props.setCurrentIndex(index)
                                    }
                                }} >

                                <Text style={[styles.heading]}>{question}</Text>
                                {index == props.currentIndex ? (
                                    <View style={styles.dropDownIconRotateView}>
                                        <DropDownIcon color={colors.appBlack} />
                                    </View>
                                ) :
                                    <View style={styles.dropDownIconView}>
                                        <DropDownIcon color={colors.appBlack} />
                                    </View>
                                }
                            </TouchableOpacity>

                            {index === props.currentIndex ? (
                                <View style={styles.subCategoriesList}>
                                    {answerCollection.map(subCategory =>
                                        subCategory.length > 0 ? (
                                            <View>
                                                <View>
                                                    <View style={styles.viewWidth} />
                                                    <Text style={styles.subCatText} key={subCategory}>{subCategory}</Text>
                                                </View>

                                            </View>
                                        ) : null)}
                                </View>
                            ) : null}
                        </View>
                    </View>
                )
            })}
        </Transitioning.View>
    )
}
