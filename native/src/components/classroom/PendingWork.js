import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Caption, Subheading} from 'react-native-paper';
import {globalColors} from '../../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PendingWork({assignments, navigateToScreen}) {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <MaterialIcons
          name="sticky-note-2"
          size={18}
          color={globalColors.Light}
          style={{
            marginRight: 5,
          }}
        />
        <Subheading style={styles.heading}>Pending Work</Subheading>
      </View>
      <View style={styles.bottomView}>
        {assignments?.length ? (
          assignments?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigateToScreen(item.id)}
              style={styles.view}>
              <MaterialIcons
                name="arrow-right"
                size={25}
                color={globalColors.Dark}
              />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Caption>Woohoo, no work left!!</Caption>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: globalColors.Aqua,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 5,
  },
  heading: {
    color: globalColors.Light,
  },
  bottomView: {paddingHorizontal: 5},
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    fontSize: 18,
  },
});
