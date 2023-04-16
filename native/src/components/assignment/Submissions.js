import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, Caption, Subheading, Title} from 'react-native-paper';
import {globalColors, globalStyles} from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Submissions({submissions}) {
  const openLink = link => {
    Linking.openURL(link);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Subheading
        style={{color: globalColors.Light, ...globalStyles.textSubTitle}}>
        {item.email}
      </Subheading>
      <View style={{marginVertical: 10, flexWrap: 'wrap'}}>
        <TouchableOpacity
          onPress={() => openLink(item.file.url)}
          style={styles.btn}>
          <MaterialIcons name="link" size={20} color={globalColors.Dark} />
          <Text
            style={{
              fontSize: 18,
              color: globalColors.Dark,
            }}>
            {item.file.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.horizontalView}>
        <MaterialIcons
          name="check-circle"
          size={20}
          color={globalColors.Success}
          style={{marginRight: 5}}
        />
        <Title style={{color: globalColors.Success}}>
          Submissions ({submissions.length})
        </Title>
      </View>
      {submissions?.length ? (
        <FlatList
          data={submissions}
          keyExtractor={item => item.email.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Caption style={{color: globalColors.Danger}}>
          No submissions yet...
        </Caption>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: globalColors.Warning,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: globalColors.Dark,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: globalColors.Info,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
