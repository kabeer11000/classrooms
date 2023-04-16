import React, {useState} from 'react';
import {View, TouchableOpacity, Platform, StyleSheet, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMsg} from '../../contexts/MsgContext';
import {globalColors} from '../../styles/styles';
import {Subheading} from 'react-native-paper';

export default function SelectDocumentButton({
  setDocument,
  loading,
  submission,
}) {
  const {setAlert, setToast} = useMsg();
  const [name, setName] = useState(submission ? submission.file.name : null);

  const normalizePath = path => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return path;
  };

  const handleSelectFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //   console.log('Name : ' + file.name);
      const path = normalizePath(file.uri);
      const res = await RNFetchBlob.fs.readFile(path, 'base64');
      //   console.log(res);
      setName(file.name);
      setDocument({res, file});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        setToast('Process canceled');
      } else {
        //For Unknown Error
        setAlert({
          title: 'Unknown Error:',
          msg: JSON.stringify(err),
          text: 'OK',
        });
        throw err;
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={loading || submission !== null}
        style={styles.button}
        onPress={handleSelectFile}>
        <MaterialIcons
          name="upload-file"
          size={28}
          color={globalColors.Light}
        />
        <Subheading style={styles.text}>
          {name
            ? name.length > 30
              ? `${name.substring(0, 34)}...`
              : name
            : 'No file chosen...'}
        </Subheading>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: globalColors.Gray,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    color: globalColors.Light,
    marginLeft: 10,
    width: '90%',
  },
});
