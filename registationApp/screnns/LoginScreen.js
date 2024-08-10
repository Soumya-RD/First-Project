import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userNameFromServer, setUserNameFromServer] = useState(""); // State to hold user's name

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.244.200:3011/master/login', {
                username,
                password,
            });

            if (response.data && response.data.username) {
                setUserNameFromServer(response.data.username); // Update state with username
                Alert.alert("Success", `Hello, ${response.data.username}!`);

                // Pass the username to the HomeScreen
                navigation.navigate('HomeScreen', { username: response.data.username });
            } else {
                Alert.alert("Error", "Login successful but username not found.");
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                Alert.alert("Error", `Server responded with status code ${error.response.status}: ${error.response.data.message}`);
            } else if (error.request) {
                // Request was made but no response received
                Alert.alert("Error", "No response received from the server.");
            } else {
                // Something happened in setting up the request
                Alert.alert("Error", `Error in making request: ${error.message}`);
            }
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to your account</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegScreen')}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
    button: {
        borderWidth: 1,
        marginTop: 15,
        width: 120,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF', // Blue background for visibility
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white', // White text color for contrast
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: 'green', // Or any other color you prefer
    },
});

export default LoginScreen;
