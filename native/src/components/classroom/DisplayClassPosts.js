import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import icons from '../../assets/icons';
import {useAuth} from '../../contexts/AuthContext';
import {globalColors} from '../../styles/styles';

export default function DisplayClassPosts({
  items,
  type,
  isTeacher,
  navigateToScreen,
}) {
  const {currentUser} = useAuth();

  const isSubmitted = submissions => {
    if (!isTeacher && type === 'assignment') {
      if (submissions.find(i => i.email === currentUser.email)) {
        return globalColors.Success;
      }
      return globalColors.Danger;
    }
    return globalColors.Light;
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToScreen(item.id)}>
      <View style={styles.post}>
        <Image
          source={type === 'assignment' ? icons.assignment : icons.material}
          style={{
            width: 25,
            height: 25,
            marginRight: 10,
            tintColor: isSubmitted(item.submissions),
          }}
        />
        <Text style={styles.name}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {items.length ? (
        <View>
          <FlatList
            data={items.reverse()}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Subheading
          style={{color: globalColors.Secondary, textAlign: 'center'}}>
          No {type}s posted.
        </Subheading>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  post: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: globalColors.Dark,
    borderRadius: 15,
  },
  name: {
    fontSize: 25,
    color: globalColors.Light,
  },
});
