/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:21 PM - 15/08/2024
 * User: lam-nguyen
 **/

import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";

type SelectorProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.JSX.Element;
}

function Selector<T>({data, renderItem}: SelectorProps<T>) {
    const [selectedItem, setSelectedItem] = React.useState<T>();

    useEffect(() => {
        setSelectedItem(data[0]);
    }, []);

    const renderItems = data.map((item: T, index: number) => {
        return <TouchableOpacity style={{padding: 0, margin: 0}} key={index} onPress={() => {
            setSelectedItem(item);
        }}>
            {renderItem(item, index)}
        </TouchableOpacity>
    });

    return (
        <View style={[styles.container]}>
            {selectedItem && renderItem(selectedItem as T, -1)}
            <ScrollView>
                {renderItems}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Selector;
