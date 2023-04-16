import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {globalColors, globalStyles} from '../styles/styles';

export default function Register({navigation}) {
  const {register} = useAuth();
  const {setAlert} = useMsg();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleRegister = () => {
    if (email && password && cPassword) {
      if (cPassword === password) {
        register(email, password);
      } else {
        setAlert({
          title: 'Invalid',
          msg: "Password doesn't match",
          text: 'Understood',
        });
      }
    } else {
      setAlert({
        title: 'Invalid',
        msg: "Empty fields aren't allowed",
        text: 'Understood',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Text
          style={{
            ...styles.text,
            ...globalStyles.textTitle,
            color: globalColors.Info,
          }}>
          Register
        </Text>
        <View style={{marginVertical: 10}}>
          <TextInput
            mode="flat"
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            mode="flat"
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            mode="flat"
            style={styles.input}
            label="Confirm Password"
            value={cPassword}
            onChangeText={setCPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.btn}>
          <Button
            mode="contained"
            onPress={handleRegister}
            color={globalColors.Primary}>
            Register
          </Button>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.replace('Login')}>
          <Text
            style={{
              ...styles.text,
              ...globalStyles.textSubTitle,
            }}>
            Login with existing account...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    ...globalStyles.component,
  },
  innerView: {
    padding: 15,
    backgroundColor: globalColors.Dark,
    borderRadius: 20,
    elevation: 4,
  },
  input: {
    marginVertical: 5,
    height: 55,
  },
  btn: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    color: globalColors.Light,
  },
});
