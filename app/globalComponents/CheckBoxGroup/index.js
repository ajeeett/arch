import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import CustomText from '../CustomText';
import { Checkbox } from 'react-native-paper';
import { fontSemiBold } from '../../utils/config/fonts';
import { isTablet } from 'react-native-device-info';


export const CheckBoxGroup = props => {
    var initArrTest = [{
        id: 1,
        title: '(A)',
        value: "A",
        checked: false,
    }, {
        id: 2,
        title: '(B)',
        value: "B",
        checked: false,
    }, {
        id: 3,
        title: '(C)',
        value: "C",
        checked: false,
    }, {
        id: 4,
        title: '(D)',
        value: "D",
        checked: false,
    }];
    const [checkboxesInit, setCheckboxesInit] = useState([{
        id: 1,
        title: '(A)',
        value: "A",
        checked: false,
    }, {
        id: 2,
        title: '(B)',
        value: "B",
        checked: false,
    }, {
        id: 3,
        title: '(C)',
        value: "C",
        checked: false,
    }, {
        id: 4,
        title: '(D)',
        value: "D",
        checked: false,
    }]);

    const [checkboxes, setCheckboxes] = useState([{
        id: 1,
        title: '(A)',
        value: "A",
        checked: false,
    }, {
        id: 2,
        title: '(B)',
        value: "B",
        checked: false,
    }, {
        id: 3,
        title: '(C)',
        value: "C",
        checked: false,
    }, {
        id: 4,
        title: '(D)',
        value: "D",
        checked: false,
    }]);

    useEffect(() => {

        return () => {
            initArrTest = [];
        }
    }, [])

    const onClickCheckBox = () => {
        const selected = []
        checkboxes.map(item => {
            if (item.checked == true)
                selected.push(item.value);
        })
        // console.warn(selected);
        props.selectedData(selected);
    }

    const toggleCheckbox = (id, index) => {
        // console.log("toggleCheckbox", id, index);
        const checkboxData = [...checkboxes];
        checkboxData[index].checked = !checkboxData[index].checked;
        // console.log('Checkboxdata', checkboxData);
        setCheckboxes(checkboxData);
        // props.selectedData(checkboxData);
        onClickCheckBox();
    }

    useEffect(() => {
        if (props.resetCheck.length == 0) {
            setCheckboxes([{
                id: 1,
                title: '(A)',
                value: "A",
                checked: false,
            }, {
                id: 2,
                title: '(B)',
                value: "B",
                checked: false,
            }, {
                id: 3,
                title: '(C)',
                value: "C",
                checked: false,
            }, {
                id: 4,
                title: '(D)',
                value: "D",
                checked: false,
            }])
        } else {

            // const checkboxData = [...checkboxes];
            // console.log(checkboxData, '----cbdata');
            var arr = [];
            var cbInitData = [...initArrTest];
            console.log('initArrTest', initArrTest);
            console.log('initialDataArr', cbInitData);
            var previousArr = [...props.resetCheck];
            console.log(previousArr, '-==prevarrr');

            for (let index = 0; index < cbInitData.length; index++) {
                const element = cbInitData[index];

                for (let j = 0; j < previousArr.length; j++) {
                    const ele2 = previousArr[j];
                    if (element.value == ele2) {
                        console.log('element.value--->', element.value);
                        console.log('props.resetCheck[index]--->', ele2);
                        element.checked = true;
                        console.log('newELeent', element);
                        // arr = arr.map(u => u.checked != element.checked ? u : element);
                    } else {
                    }

                }
                arr.push(element);

            }

            console.log('cbInitData', arr);
            setCheckboxes(arr);
            cbInitData = [];
            console.log('not resetting because checkSelected.length == 0', props.resetCheck);
        }

    }, [props.resetCheck])

    const checkBoxesView = checkboxes.map((item, index) => {
        return (
            <View style={styles.option}>
                <Checkbox
                    disabled={props.disabled}
                    key={item.id}
                    checked={props.resetCheck.length == 0 ? false : item.checked}
                    status={props.resetCheck.length == 0 ? 'unchecked' : item.checked ? 'checked' : 'unchecked'}
                    onPress={() => toggleCheckbox(item.id, index)}
                    color={colors.appBlue}
                    theme={{ colors: { primary: colors.appBlue } }}
                />
                <CustomText content={item.title} styles={styles.text} />
            </View>
        );
    });

    return (
        <View style={styles.container}>
            {checkBoxesView}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // width:"100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    option: {
        flexDirection: 'row',
        alignItems: "center",
        paddingEnd: isTablet() ? "17.5%" : "7.5%"

    },
    text: {
        fontFamily: fontSemiBold
    }
});