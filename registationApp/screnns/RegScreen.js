import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import axios from 'axios';

export default function App({navigation}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.55.200:3011/master', {
                username,
                email,
                password,
            });
            Alert.alert("Success", "User registered successfully!");
            console.log(response.data);
        } catch (error) {
            Alert.alert("Error", "There was an error registering the user.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Register" onPress={handleRegister} />

            <TouchableOpacity style={styles.loginConatiner} onPress={()=>navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
    loginConatiner:{
        borderWidth:1,
        width:120,
        height:35,
        borderRadius:5,
        marginLeft:100,
        marginTop:15

    },
    loginText:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        paddingTop:2
    }
});
