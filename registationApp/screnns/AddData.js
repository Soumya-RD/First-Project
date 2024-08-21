import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';

const AddData = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.55.200:3011/tasks', { // Use your server's URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, time }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter task name'
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        placeholder='Time'
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginTop: 20,
    paddingTop: 2,
    width: 250,
    marginBottom: 10,
    paddingLeft: 20,
  },
});

export default AddData;
