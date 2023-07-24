import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    try {
      const name = await AsyncStorage.getItem('name')
      if (name !== null) {
        setName(name)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name)
      Alert.alert('Saved', 'Name saved successfully')
    } catch (e) {
      console.log(e)
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('name')
      setName('')
      Alert.alert('Deleted', 'Name deleted successfully')
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <View style={styles.container}>
      {name != '' ? <Text>Hola {name}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder='Write your Name'
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Button
        title="Save"
        onPress={() => { saveData() }} />

      {name != '' ? <TouchableHighlight
        style={styles.btnDelete}
        onPress={() => { deleteData() }}
      >
        <Text style={styles.txtDelete}>Delete name &times;</Text>
      </TouchableHighlight> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnDelete: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtDelete: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  },
  btnSave: {
    marginTop: 20,
    color: '#000',
  }
});

export default App;
