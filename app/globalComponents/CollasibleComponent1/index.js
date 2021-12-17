import React from 'react';
import { Text, ScrollView, SafeAreaView, View } from 'react-native';
import { colors } from '../../utils/config/colors';
import styles from './style';
import { List } from 'react-native-paper';
import { fontBold, fontSemiBold, fontRegular } from '../../utils/config/fonts';
import OnlineGreen from '../../assets/svg/OnlineGreen';

export default function CollasibleComponent1(props) {
    return (
        <View>
            <List.Accordion
                // left={() =>
                //     // (
                //     // <View style={{
                //     //     display: 'flex',
                //     //     flex: 1,
                //     //     justifyContent: 'space-between',
                //     // }}>

                //     //     <Text style={{
                //     //         fontFamily: fontBold,
                //     //         fontSize: 14,

                //     //     }}>{props.heading}</Text>


                //     // </View>
                // // )
                // }

                titleStyle={styles.titleStyle}
                title={
                    <View style={styles.titleViewStyle}>
                        <Text style={styles.textStyle}>{props.heading}</Text>
                    </View>
                }
                style={styles.titleLeftStyle}
                right={props => <Text>Conectar</Text>}
            >
                <List.Item
                    style={styles.listStyle}
                    title={
                        <View style={styles.listTitleView}>
                            <Text style={styles.listTitleText}>3 Topics • 57 mins</Text>
                        </View>
                    }
                    right={props => (
                        <View style={styles.resourceContainer}>
                            <View style={styles.resourceView}>
                                <Text style={styles.listTitleText}>5 Resources</Text>
                            </View>
                        </View>
                    )} />
            </List.Accordion>
        </View>
    )
}
