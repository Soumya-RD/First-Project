import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
    // Destructure username from route.params or default to 'Guest'
    const { username = 'Guest' } = route.params || {};

    const [rows, setRows] = useState([
        { id: '1', sl: '1', task: '', time: '', operation: '' }
    ]);

    const handleChange = (id, field, value) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.sl}</Text>
            <TextInput
                style={styles.cell}
                value={item.task}
                onChangeText={(text) => handleChange(item.id, 'task', text)}
                placeholder="Enter task"
            />
            <TextInput
                style={styles.cell}
                value={item.time}
                onChangeText={(text) => handleChange(item.id, 'time', text)}
                placeholder="Enter time"
            />
            <TextInput
                style={styles.cell}
                value={item.operation}
                onChangeText={(text) => handleChange(item.id, 'operation', text)}
                placeholder="Enter operation"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.headerSL]}>SL</Text>
                <Text style={[styles.headerText, styles.headerTask]}>Task Name</Text>
                <Text style={[styles.headerText, styles.headerTime]}>Time</Text>
                <Text style={[styles.headerText, styles.headerOperation]}>Operation</Text>
            </View>
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
    },
    greeting: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    headerText: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerSL: {
        backgroundColor: '#004d00',
    },
    headerTask: {
        backgroundColor: '#006400',
    },
    headerTime: {
        backgroundColor: '#004d00',
    },
    headerOperation: {
        backgroundColor: '#006400',
    },
    row: {
        flexDirection: 'row',
        // marginBottom: 5,
        // borderBottomWidth: 1,
        // borderBottomColor: 'gray',
        // paddingVertical: 8,
    },
    cell: {
        flex: 1,
        // marginHorizontal: 4,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
    },
    button: {
        marginTop: 20,
        borderWidth: 1,
        width: 120,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default HomeScreen;
