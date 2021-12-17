import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export default function ExamQuestionInstructions(props) {

    return (

        <View>

            <Text style={styles.headTextNormal}>Question given below has four answers options out of which
                <Text style={styles.boldHead}
                    onPress={() => { /*your on press event here */ }}
                > ONLY ONE </Text>
                is correct. Choose the most appropriate option as your answer in response are. For CORRECT answer you will be awarded
                <Text style={styles.boldHead}
                    onPress={() => { /*your on press event here */ }}
                > +4 </Text>
                marks and for WRONG answer these is a negative marking of
                <Text style={styles.boldHead}
                    onPress={() => { /*your on press event here */ }}
                > 1 mark. </Text>
                No marks will be awarded if you leave question unattempted.
            </Text>



        </View>
    )
}