import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {useAuth} from '../../contexts/AuthContext';
import {useClassroom} from '../../contexts/ClassroomContext';
import {useMsg} from '../../contexts/MsgContext';
import {database} from '../../firebase';
import {globalColors, globalStyles} from '../../styles/styles';

export default function CreateClass({navigation}) {
  const {setToast: setMsg, setAlert} = useMsg();
  const {currentUser} = useAuth();
  const {loading, createClass} = useClassroom();
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const handleSubmit = async () => {
    if (className && subjectName && subjectCode) {
      Keyboard.dismiss();
      let newClass = {
        className,
        subjectName,
        subjectCode,
        teacher: currentUser.email,
        students: [],
        createdAt: database.getCurrentTimestamp(),
      };
      let res = await createClass(newClass);
      if (res.error) {
        setMsg(res.error);
      } else {
        setMsg(res.msg);
        setClassName('');
        setSubjectName('');
        setSubjectCode('');
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
        <Headline style={styles.title}>Create Class</Headline>
        <TextInput
          label="Class name"
          required
          value={className}
          onChangeText={setClassName}
          style={styles.textInput}
        />
        <TextInput
          label="Subject name"
          required
          value={subjectName}
          onChangeText={setSubjectName}
          style={styles.textInput}
        />
        <TextInput
          label="Subject code"
          required
          value={subjectCode}
          onChangeText={setSubjectCode}
          style={styles.textInput}
        />
        <Button
          mode="contained"
          style={{marginVertical: 15}}
          color={globalColors.Success}
          onPress={handleSubmit}
          disabled={loading}>
          Create
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
