import React from "react";
import { View } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../utils/config/colors";
import VectorIcon from "../VectorIcon";
import styles from "./style";

export default function DropDown(props) {
    return (
        <View style={styles.wraperStyle}>
            <DropDownPicker
                items={props.dropItems?.map((e) => ({
                    label: e,
                    value: e
                }))}
                style={styles.dropDown}
                placeholder={props.placeholder}
                // dropDownStyle={{
                //     paddingHorizontal: 0,
                //     height: 95,
                //     borderWidth: 0,
                //     backgroundColor: '#355d71'
                // }} 
                // containerStyle={{
                //     width: 100,
                //     height: 30,
                //     marginRight: 8
                // }} itemStyle={{
                //     backgroundColor: '#355d71',
                //     paddingHorizontal: 8,
                //     height: 44,
                //     borderBottomWidth: 0.5,
                //     borderColor: '#ffffff',
                //     justifyContent: 'flex-start'
                // }}
                // labelStyle={{
                //     fontFamily: 'Roboto',
                //     fontSize: 15,
                //     fontWeight: '400',
                //     color: 'rgba(255, 255, 255, 0.8)'
                // }}
                // selectedLabelStyle={{
                //     fontFamily: 'Roboto',
                //     fontSize: 15,
                //     fontWeight: '500',
                //     color: '#FFFFFF'
                // }} activeLabelStyle={{
                //     fontFamily: 'Roboto',
                //     fontSize: 15,
                //     fontWeight: '400',
                //     color: '#FFFFFF'
                // }}
                // arrowStyle={{ paddingHorizontal: 3, paddingVertical: 0 }}
                labelStyle={styles.dropDownLabel}
                placeholderStyle={styles.placeholderStyle}
                itemStyle={styles.itemStyle}
                selectedLabelStyle={styles.dropDownSelectedLabel}
                dropDownStyle={styles.dropDownHeight}
                containerStyle={styles.dropDownContainer}

                onChangeItem={((item) => props.onChange(item.value))}

                customArrowUp={(size, color) => <VectorIcon color={colors.appBlue} name={'caretup'} groupName={'AntDesign'} />}
                customArrowDown={(size, color) => <VectorIcon color={colors.appBlue} name={'caretdown'} groupName={'AntDesign'} />}
            />
        </View >
    )
}