import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Submissions from '../components/assignment/Submissions';
import SubmitAssignment from '../components/assignment/SubmitAssignment';
import Details from '../components/material/Details';
import Loading from '../containers/Loading';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import useClass from '../hooks/useClass';
import {globalStyles} from '../styles/styles';

export default function Assignment({route, navigation}) {
  const {currentUser} = useAuth();
  const {setToast: setMsg} = useMsg();
  const {classId, assignmentId} = route.params;
  const {
    loading,
    assignments,
    isTeacher,
    error,
    uploadFileToDriveAndPostContent,
    submitAssignment,
  } = useClass(classId);
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (assignments) {
      const data = assignments?.find(item => item.id === assignmentId);
      if (data) {
        // console.log(data);
        setAssignment(data);
        let doc = data.submissions.find(i => i.email === currentUser.email);
        setSubmission(doc ? doc : null);
      } else {
        setMsg('No assignment found...');
        navigation.goBack();
      }
    }
  }, [assignments, assignmentId, classId, setMsg, navigation]);

  useEffect(() => {
    if (error) {
      navigation.goBack();
    }
  }, [error, navigation]);

  const handleSubmit = async () => {
    if (document) {
      const newSubmission = {
        assignmentId,
        email: currentUser.email,
        file: {},
      };
      await uploadFileToDriveAndPostContent(
        newSubmission,
        document.res,
        document.file,
        submitAssignment,
      );
    } else {
      setMsg('Material is missing');
    }
  };

  return assignment !== null ? (
    <View style={globalStyles.component}>
      <Details content={assignment} type="assignment" />
      {isTeacher && <Submissions submissions={assignment?.submissions} />}
      {!isTeacher && (
        <SubmitAssignment
          loading={loading}
          submission={submission}
          document={document}
          setDocument={setDocument}
          handleSubmit={handleSubmit}
        />
      )}
    </View>
  ) : (
    <Loading />
  );
}
