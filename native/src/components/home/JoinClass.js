import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {useAuth} from '../../contexts/AuthContext';
import {useClassroom} from '../../contexts/ClassroomContext';
import {useMsg} from '../../contexts/MsgContext';
import {globalColors, globalStyles} from '../../styles/styles';

export default function JoinClass({navigation}) {
  const {setToast: setMsg, setAlert} = useMsg();
  const {currentUser} = useAuth();
  const {loading, joinClass} = useClassroom();
  const [classId, setClassId] = useState('');

  const handleSubmit = async () => {
    if (classId) {
      Keyboard.dismiss();
      let res = await joinClass(classId, currentUser.email);
      if (res.error) {
        setMsg(res.error);
      } else {
        setMsg(res.msg);
        setClassId('');
        let {id} = res.data;
        navigation.navigate('Classroom', {classId: id});
      }
    } else {
      setAlert({
        title: 'Invalid',
        msg: "Empty Fields aren't allowed!",
        text: 'Understood',
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.card}>
        <Headline style={styles.title}>Join Class</Headline>
        <TextInput
          label="Class code"
          required
          value={classId}
          onChangeText={setClassId}
          style={styles.textInput}
        />
        <Button
          mode="contained"
          style={{marginVertical: 15}}
          color={globalColors.Success}
          onPress={handleSubmit}
          disabled={loading}>
          Join
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: globalColors.Dark,
    width: '90%',
  },
  title: {color: globalColors.Light, marginBottom: 10},
  textInput: {
    marginVertical: 10,
    backgroundColor: globalColors.Light,
    height: 60,
  },
});
