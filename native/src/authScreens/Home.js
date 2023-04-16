import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Divider, Subheading} from 'react-native-paper';
import {globalColors, globalStyles} from '../styles/styles';
import {useClassroom} from '../contexts/ClassroomContext';
import Loading from '../containers/Loading';
import Class from '../components/home/Class';
import NoClass from '../components/home/NoClass';
import AddClassButton from '../components/home/AddClassButton';

export default function Home({navigation}) {
  const [classesAsTeacher, setClassesAsTeacher] = useState(null);
  const [classesAsStudent, setClassesAsStudent] = useState(null);
  const {loading, getClassesAsTeacher, getClassesAsStudent} = useClassroom();

  useEffect(() => {
    getClassesAsTeacher().then(docs => setClassesAsTeacher(docs));
  }, []);

  useEffect(() => {
    getClassesAsStudent().then(docs => setClassesAsStudent(docs));
  }, []);

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({item}) => (
    <Class
      item={item}
      key={item.id}
      navigateToClassroom={navigation.navigate}
    />
  );

  return (
    <SafeAreaView style={globalStyles.component}>
      {classesAsTeacher?.length > 0 && (
        <View style={styles.view}>
          <FlatList
            data={classesAsTeacher}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              classesAsTeacher.length > 0 && (
                <Subheading style={styles.subtitle}>Teacher</Subheading>
              )
            }
          />
        </View>
      )}

      {classesAsTeacher?.length > 0 && classesAsStudent?.length > 0 && (
        <Divider style={styles.divider} />
      )}

      {classesAsStudent?.length > 0 && (
        <View style={styles.view}>
          <FlatList
            data={classesAsStudent}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              classesAsStudent?.length > 0 && (
                <Subheading style={styles.subtitle}>Student</Subheading>
              )
            }
          />
        </View>
      )}

      {classesAsTeacher?.length === 0 && classesAsStudent?.length === 0 && (
        <NoClass />
      )}

      <AddClassButton navigateToScreen={val => navigation.navigate(val)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: globalColors.Warning,
  },
  view: {
    margin: 10,
  },
  midView: {
    marginTop: 5,
    flex: 1,
    backgroundColor: globalColors.Light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 2,
  },
  divider: {
    marginVertical: 5,
    backgroundColor: globalColors.Secondary,
  },
});
