import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {globalColors} from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDocumentButton from './SelectDocumentButton';
import {useMsg} from '../../contexts/MsgContext';

export default function PostToClass({
  loading,
  classId,
  postNewMaterial,
  postNewAssignment,
  uploadFileToDriveAndPostContent,
}) {
  const {setToast: setMsg} = useMsg();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState({});
  const [type, setType] = useState('Material');

  const handleSubmit = async e => {
    e.preventDefault();
    if (title && description && type) {
      if (type === 'Material') {
        handlePostMaterial();
      } else {
        handlePostAssignment();
      }
    } else {
      setMsg("Empty Fields aren't allowed!");
    }
  };

  const handlePostMaterial = async () => {
    // console.log('Material');
    if (document) {
      Keyboard.dismiss();
      const newMaterial = {
        classId,
        title,
        description,
        file: {},
      };
      await uploadFileToDriveAndPostContent(
        newMaterial,
        document.res,
        document.file,
        postNewMaterial,
      );
    } else {
      setMsg('Material is missing');
    }
  };

  const handlePostAssignment = async () => {
    // console.log('Assignment');
    Keyboard.dismiss();
    const newAssignment = {
      classId,
      title,
      description,
      file: {},
      submissions: [],
    };
    await uploadFileToDriveAndPostContent(
      newAssignment,
      document ? document.res : '',
      document ? document.file : '',
      postNewAssignment,
    );
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.postBtn}
        onPress={() => setOpenModal(true)}>
        <MaterialIcons name="post-add" size={32} color={globalColors.Dark} />
      </TouchableOpacity>
      <Modal visible={openModal} animationType="fade">
        <ScrollView style={styles.component}>
          <TopView setOpenModal={setOpenModal} />
          <View style={styles.midView}>
            <View style={styles.selectType}>
              <TouchableOpacity
                onPress={() => setType('Material')}
                style={
                  type === 'Material' ? styles.selected : styles.notSelected
                }>
                <Text style={{color: globalColors.Light}}>Material</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType('Assignment')}
                style={
                  type === 'Assignment' ? styles.selected : styles.notSelected
                }>
                <Text style={{color: globalColors.Light}}>Assignment</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              mode="flat"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              label="Title"
            />
            <TextInput
              mode="flat"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              label="Description"
              multiline={true}
              numberOfLines={5}
            />
            <SelectDocumentButton setDocument={setDocument} />
            <Text style={styles.text}>
              *Document for assignment is an optional
            </Text>
            <Button
              mode="contained"
              color={globalColors.Success}
              onPress={handleSubmit}
              disabled={loading}>
              Post
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const TopView = ({setOpenModal}) => (
  <View style={styles.topView}>
    <Title style={{color: globalColors.Info, fontSize: 22}}>
      Post To Class
    </Title>
    <TouchableOpacity
      style={{justifyContent: 'center'}}
      onPress={() => setOpenModal(false)}>
      <MaterialIcons name="close" size={26} color={globalColors.Light} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  component: {
    backgroundColor: globalColors.LightGray,
    flex: 1,
  },
  topView: {
    padding: 10,
    backgroundColor: globalColors.Gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  midView: {
    padding: 20,
  },
  postBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: globalColors.Info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectType: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
  },
  selected: {
    borderRadius: 10,
    backgroundColor: globalColors.Danger,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  notSelected: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  text: {
    color: globalColors.Secondary,
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 10,
  },
});
