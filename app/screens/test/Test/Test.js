import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";

import { Button, ButtonContainer } from "../Test/comp/Button";
import Alert from './comp/Alert'
import quest from './comp/questions'
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#36B1F0",
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600"
    },
    safearea: {
        flex: 1,
        marginTop: 100,
        justifyContent: "space-between"
    }
});

export default class Test extends React.Component {
    state = {
        correctCount: 0,
        totalCount: quest.length,
        activeQuestionIndex: 0,
        answered: false,
        answerCorrect: false
    };

    answer = correct => {
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
                console.log(this.state, '---nextState');
                setTimeout(() => this.nextQuestion(), 750);
            }
        );
    };

    nextQuestion = () => {
        this.setState(state => {
            const nextIndex = state.activeQuestionIndex + 1;

            if (nextIndex >= state.totalCount) {
                alert(this.state.correctCount)
                console.log('finished');
                return
                // return this.props.navigation.popToTop();
                // alert(this.state.answerCorrect)
                // console.log(this.state.answered, '--answered');
            }

            return {
                activeQuestionIndex: nextIndex,
                answered: false
            };
        });
    };

    render() {
        const questions = quest;
        const question = questions[this.state.activeQuestionIndex];
        console.log(question, '--question');
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: '#090' }
                ]}
            >
                <SafeAreaView style={styles.safearea}>
                    <View>
                        <Text style={styles.text}>{question.question}</Text>

                        <ButtonContainer>
                            {question.answers.map(answer => (
                                <Button
                                    key={answer.id}
                                    text={answer.text}
                                    onPress={() => this.answer(answer.correct)}
                                />
                            ))}
                        </ButtonContainer>
                    </View>

                    <Text style={styles.text}>
                        {`${this.state.correctCount}/${this.state.totalCount}`}
                    </Text>
                </SafeAreaView>
                {/* <Alert
                    correct={this.state.answerCorrect}
                    visible={this.state.answered}
                /> */}
            </View>
        );
    }
}

