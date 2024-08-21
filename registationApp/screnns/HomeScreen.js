import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, RefreshControl, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = ({ route, navigation }) => {
    const { username = 'Guest' } = route.params || {};
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.55.200:3011/tasks');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }
            const data = await response.json();
            setRows(data);
        } catch (error) {
            setError(error.message);
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
            setRefreshing(false); // Stop refreshing when data is loaded
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.sl || 'N/A'}</Text>
            <Text style={styles.cell}>{item.name || 'N/A'}</Text>
            <Text style={styles.cell}>{item.time || 'N/A'}</Text>

            <Text style={styles.cell}>
                <TouchableOpacity>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </Text>
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
            <Text style={styles.greeting}>Hello  {username}, Good Morning</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 200, flexDirection: 'row' }}>
                    {/* Text hilight */}
                    {/* <TextInput placeholder='Text' style={{ width: 150, textAlign: 'center', borderRightWidth: 1 }} /> */}
                    <View>
                        <Text>Your's Current work:</Text>
                    </View>
                   

                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddData')}
                >
                    <Text>Add new</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.headerSL]}>SL</Text>
                <Text style={[styles.headerText, styles.headerTask]}>Task Name</Text>
                <Text style={[styles.headerText, styles.headerTime]}>Time</Text>
                <Text style={[styles.headerText, styles.headerOperation]}>Operation</Text>
            </View>
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
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
        marginLeft: 20,
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
