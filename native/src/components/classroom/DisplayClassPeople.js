import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {Subheading} from 'react-native-paper';
import icons from '../../assets/icons';
import {useAuth} from '../../contexts/AuthContext';
import {globalColors} from '../../styles/styles';

export default function DisplayClassPeople({people, teacher}) {
  const {currentUser} = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Subheading style={styles.subheading}>Teacher</Subheading>
        <View style={styles.displayTextView}>
          <Image
            source={icons.teacher}
            style={{
              width: 20,
              height: 20,
              tintColor: globalColors.Info,
            }}
          />
          <Text style={{...styles.text, color: globalColors.Info}}>
            {teacher}
            {teacher === currentUser.email && (
              <Text style={styles.you}> (You)</Text>
            )}
          </Text>
        </View>
      </View>
      {people.length > 0 && (
        <View style={styles.view}>
          <Subheading style={styles.subheading}>
            Students ({people.length})
          </Subheading>
          <FlatList
            data={people}
            keyExtractor={item => item.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  ...styles.displayTextView,
                  paddingBottom: 15,
                  borderBottomColor: globalColors.Secondary,
                  borderBottomWidth: index !== people.length - 1 ? 1 : 0,
                }}
                key={item}>
                <Image
                  source={icons.student}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: globalColors.Light,
                  }}
                />
                <Text style={styles.text}>
                  {item}
                  {item === currentUser.email && (
                    <Text style={styles.you}> (You)</Text>
                  )}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  view: {
    marginBottom: 5,
  },
  subheading: {
    color: globalColors.Warning,
    marginBottom: 5,
  },
  displayTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: globalColors.Light,
    fontSize: 22,
    marginLeft: 15,
  },
  you: {
    marginLeft: 5,
    color: globalColors.Secondary,
  },
});
