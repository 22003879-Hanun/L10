import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    itemContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#A9AA5D',
        borderRadius: 10,
        backgroundColor: '#006A4F',
    },
    inputStyle: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#B29700',
        padding: 10,
        marginVertical: 10,
    },
});

const App = () => {
    const [mydata, setMydata] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=famouspaintings&format=json&case=default")
            .then((response) => response.json())
            .then((data) => {
                setMydata(data);
                setOriginalData(data);
            });
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            const filteredData = originalData.filter((item) =>
                item.PaintingName.toLowerCase().includes(text.toLowerCase()) ||
                item.Artist.toLowerCase().includes(text.toLowerCase()) ||
                item.Location.toLowerCase().includes(text.toLowerCase()) ||
                item.City.toLowerCase().includes(text.toLowerCase())
            );
            setMydata(filteredData);
        } else {
            setMydata(originalData);
        }
    };



    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    PAINTING NAME: {item.PaintingName}
                </Text>
                <Text>RANK: {item.Rank}</Text>
                <Text>ARTIST: {item.Artist}</Text>
                <Text>YEAR: {item.Year}</Text>
                <Text>LOCATION: {item.Location}</Text>
                <Text>CITY: {item.City}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.textStyle}>Famous Paintings</Text>
            <Text>Search:</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => {
                    FilterData(text);
                }}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default App;
