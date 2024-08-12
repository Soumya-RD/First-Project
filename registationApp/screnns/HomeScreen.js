import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
    const { username = 'Guest' } = route.params || {};
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.244.200:3011/tasks'); // Replace with your backend endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRows(data);
            } catch (error) {
                setError(error.message);
                Alert.alert('Error', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.sl}</Text>
            <Text style={styles.cell}>{item.task}</Text>
            <Text style={styles.cell}>{item.time}</Text>
            <Text style={styles.cell}>{item.operation}</Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello, {username}!</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddData')}
            >
                <Text>Add new</Text>
            </TouchableOpacity>

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
        padding: 16,
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
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
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
    addButton: {
        borderWidth: 1,
        width: 60,
        marginLeft: 250,
        height: 30,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
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
