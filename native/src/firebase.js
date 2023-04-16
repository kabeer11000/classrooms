import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const database = {
  folders: userId =>
    firestore().collection('gd').doc(userId).collection('folders'),
  files: userId => firestore().collection('gd').doc(userId).collection('files'),
  classrooms: () => firestore().collection('gc-classrooms'),
  materials: () => firestore().collection('gc-materials'),
  assignments: () => firestore().collection('gc-assignments'),
  formatDocument: doc => ({id: doc.id, ...doc.data()}),
  getCurrentTimestamp: firestore.FieldValue.serverTimestamp,
};

export {database, storage};
