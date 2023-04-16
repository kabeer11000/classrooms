import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DetailsHeader from '../components/classroom/DetailsHeader';
import DisplayClassPeople from '../components/classroom/DisplayClassPeople';
import DisplayClassPosts from '../components/classroom/DisplayClassPosts';
import PendingWork from '../components/classroom/PendingWork';
import PostToClass from '../components/classroom/PostToClass';
import SelectOptions from '../components/classroom/SelectOptions';
import Loading from '../containers/Loading';
import {useAuth} from '../contexts/AuthContext';
import useClass from '../hooks/useClass';
import {globalStyles} from '../styles/styles';

export default function Classroom({route, navigation}) {
  const {classId} = route.params;
  const {currentUser} = useAuth();
  const {
    loading,
    error,
    currentClass,
    materials,
    assignments,
    isTeacher,
    postNewMaterial,
    postNewAssignment,
    uploadFileToDriveAndPostContent,
  } = useClass(classId);
  const [selectedOption, setSelectedOption] = useState('Materials');

  const switchContent = () => {
    switch (selectedOption) {
      case 'Assignments':
        return (
          <DisplayClassPosts
            items={assignments}
            type="assignment"
            navigateToScreen={assignmentId =>
              navigation.navigate('Assignment', {assignmentId, classId})
            }
            isTeacher={isTeacher}
          />
        );
      case 'People':
        return (
          <DisplayClassPeople
            people={currentClass?.students}
            teacher={currentClass?.teacher}
          />
        );
      default:
        return (
          <DisplayClassPosts
            items={materials}
            type="material"
            navigateToScreen={materialId =>
              navigation.navigate('Material', {
                materialId,
                classId,
              })
            }
          />
        );
    }
  };

  const getPendingWork = () => {
    if (assignments) {
      let list = [];
      assignments.forEach(assignment => {
        let flag = 1;
        for (const submission of assignment.submissions) {
          if (submission.email === currentUser.email) {
            flag = 0;
            break;
          }
        }
        flag && list.push(assignment);
      });
      return list;
    }
  };

  useEffect(() => {
    if (error) {
      navigation.goBack();
    }
  }, [error, navigation]);

  return currentClass != null ? (
    <View style={globalStyles.component}>
      <DetailsHeader currentClass={currentClass} isTeacher={isTeacher} />
      {currentClass && !isTeacher && (
        <PendingWork
          assignments={getPendingWork()}
          navigateToScreen={assignmentId =>
            navigation.navigate('Assignment', {assignmentId, classId})
          }
        />
      )}
      <SelectOptions
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {materials !== null && assignments !== null && switchContent()}

      {isTeacher && (
        <PostToClass
          loading={loading}
          classId={classId}
          postNewMaterial={postNewMaterial}
          postNewAssignment={postNewAssignment}
          uploadFileToDriveAndPostContent={uploadFileToDriveAndPostContent}
        />
      )}
    </View>
  ) : (
    <Loading />
  );
}
