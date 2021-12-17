import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utils/config/colors';
import CustomText from '../CustomText';
import { Checkbox } from 'react-native-paper';
import { fontSemiBold } from '../../utils/config/fonts';
import { isTablet } from 'react-native-device-info';
import { isEmpty } from 'lodash';

export const CheckboxMatrix = (props, ref) => {
    const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const column = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let initialState = [];
    const [checkboxes, setCheckboxes] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useImperativeHandle(ref, () => ({
        resetState: () => resetState(),
        resetCheckBoxState: () => setCheckboxes([]),
    }));

    useEffect(() => {
        // console.log('Check boxes', checkboxes.length);
        // console.log('Props row', props.row);
        // console.log('Props column', props.column);
        !isEmpty(props.init) ? setInitialStateProps() : generateInitialState();
        return () => {
            resetState();
        };
    }, []);

    useEffect(() => {
        // console.log('inside pros row & column');
        setCheckboxes([]);
        generateInitialState();
    }, [props.activeQuestionIndex]);

    useEffect(() => {
        // console.log(selectedValue);
        props.selectedValue(selectedValue);
    }, [selectedValue]);

    useEffect(() => {
        generateInitialState();
    }, [props.resetCheckMatrix]);

    useEffect(() => {
        if (props.init.length > 0) {
            setInitialStateProps();
        }
        return () => { };
    }, [props.init]);

    useEffect(() => {
        let selected = '';
        if (checkboxes.length > 0) {
            for (let i = 0; i < props.row; i++) {
                let flag = 0,
                    change = 0;
                for (let j = 0; j < props.column; j++) {
                    if (checkboxes[i][j].checked == true) {
                        // console.log(checkboxes[i][j].row, checkboxes[i][j].column);
                        if (flag == 0) {
                            selected += checkboxes[i][j].row + ':' + checkboxes[i][j].column + ',';
                            flag = 1;
                            change = 1;
                        } else {
                            selected += checkboxes[i][j].column + ',';
                            change = 1;
                        }
                    }
                }
                if (selected.length > 0 && change == 1) selected = selected.replace(/^|,$/g, '') + ';';
            }
            // console.log('Selected item', selected.replace(/^;|;$/g, ''));
            setSelectedValue(selected.replace(/^;|;$/g, ''));
        }
    }, [checkboxes]);

    const onPressUpdateState = (i, j) => {
        const checkbox = [...checkboxes];
        checkbox[i][j].checked = !checkbox[i][j].checked;
        setCheckboxes(checkbox);
    };

    const generateState = () => {
        let initial = [];
        for (let i = 0; i < props.row; i++) {
            let temp = [];
            for (let j = 0; j < props.column; j++) {
                temp.push({
                    row: row[i],
                    column: column[j],
                    checked: false,
                });
            }
            initial.push(temp);
        }
        return initial;
    };

    const generateInitialState = async () => {
        initialState = await generateState();
        setCheckboxes(initialState);
    };

    const setInitialStateProps = async () => {
        // let initialValue = 'A:PQ;C:PQST';
        let initialValue = props.init;
        let initialStatus = await generateState();
        let isPresentValue = ['A', 'B', 'C', 'D', 'E'];
        let sp1 = initialValue.split(';');
        let sp2 = sp1.map(item => item.split(':'));
        var input2Object = {};
        for (let i = 0; i < sp2.length; ++i) {
            input2Object[sp2[i][0]] = sp2[i][1].split(',');
        }
        let keys = Object.keys(input2Object);
        // console.log('Keys', keys);
        for (let i = 0; i < row.length; i++) {
            if (row[i] in input2Object) {
                let key = initialStatus[i][0].row;
                let value = input2Object[key];
                for (let j = 0; j < initialStatus[i].length; j++) {
                    if (value.includes(initialStatus[i][j].column))
                        initialStatus[i][j].checked = true;
                }
            }
        }
        // console.log(initialStatus);
        setCheckboxes(initialStatus);
    };

    useEffect(() => {
        setCheckboxes(initialState);
    }, [props.resetCheckMatrix]);

    const resetState = () => {
        generateInitialState();
        let setToInitial = [];
        for (let i = 0; i < props.row; i++) {
            let rowData = [];
            for (let j = 0; j < props.column; j++) {
                if (checkboxes[i][j].checked == true) {
                    let x = checkboxes[i][j];
                    x.checked = false;
                    rowData.push(x);
                } else {
                    rowData.push(checkboxes[i][j]);
                }
            }
            setToInitial.push(rowData);
        }
        setCheckboxes(setToInitial);
    };

    const Demo = () => {
        let k = [];
        for (let i = 0; i < props.column; i++) {
            k.push(
                <View style={[isTablet() ? {} : { paddingHorizontal: 22 }]}>
                    <CustomText
                        content={column[i]}
                        styles={[styles.text, isTablet() ? { paddingHorizontal: 45.5 } : {}]}
                    />
                </View>,
            );
        }
        return k;
    };

    const GenerateFirstRowCheckbox = ({ i, j }) => (
        <View style={styles.firstRow}>
            <CustomText content={column[j]}
                styles={styles.text} />
            <Checkbox
                disabled={props.disabled}
                key={checkboxes[i][j]}
                checked={checkboxes[i][j].checked}
                status={checkboxes[i][j].checked ? 'checked' : 'unchecked'}
                onPress={() => onPressUpdateState(i, j)}
                color={colors.appBlue}
                theme={{ colors: { primary: colors.appBlue } }}
            />
        </View>
    )
    const GenerateNonFirstRowCheckbox = ({ i, j }) => (
        <Checkbox
            disabled={props.disabled}
            key={checkboxes[i][j]}
            checked={checkboxes[i][j].checked}
            status={checkboxes[i][j].checked ? 'checked' : 'unchecked'}
            onPress={() => onPressUpdateState(i, j)}
            color={colors.appBlue}
            theme={{ colors: { primary: colors.appBlue } }}
        />
    )

    const RowCheckBox = ({ i }) => {
        let d = [];
        d.push(
            <CustomText
                content={row[i]}
                styles={[styles.text, styles.textAdditional]}
            />,
        );
        for (let j = 0; j < props.column; j++) {
            d.push(
                <View style={styles.option}>
                { i == 0 ? <GenerateFirstRowCheckbox i={i} j={j} /> : <GenerateNonFirstRowCheckbox i={i} j={j} />}
                </View >
            );
        }
return d;
    };

const CheckBoxesView = () => {
    let item = [];
    for (let i = 0; i < props.row; i++) {
        item.push(
            <View style={styles.row}>
                <RowCheckBox i={i} />
            </View>,
        );
    }
    return item;
};

return (
    <View style={styles.container}>
        {checkboxes.length != 0 ? (
            <View>
                <CheckBoxesView />
            </View>
        ) : null}
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: isTablet() ? '10%' : '5%',
    },
    row: {
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    text: {
        fontFamily: fontSemiBold,
    },
    textAdditional: {
        width: '4%',
        paddingBottom: 7,
        marginRight: 10
    },
    firstRow: {
        flexDirection: "column",
        alignItems: "center"
    }
});

export default forwardRef(CheckboxMatrix);
