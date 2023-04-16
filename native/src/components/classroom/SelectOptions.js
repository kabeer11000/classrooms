import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {globalColors} from '../../styles/styles';

export default function SelectOptions({selectedOption, setSelectedOption}) {
  const options = ['Materials', 'Assignments', 'People'];

  return (
    <View style={styles.container}>
      {options.map(option =>
        option === selectedOption ? (
          <View key={option} style={styles.selectedOption}>
            <Text style={styles.selected}>{option}</Text>
          </View>
        ) : (
          <View key={option} style={styles.option}>
            <TouchableOpacity onPress={() => setSelectedOption(option)}>
              <Text style={styles.notSelected}>{option}</Text>
            </TouchableOpacity>
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  selectedOption: {
    borderRadius: 10,
    backgroundColor: globalColors.Warning,
  },
  selected: {
    fontWeight: 'bold',
    color: globalColors.Dark,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  notSelected: {
    fontWeight: 'bold',
    color: globalColors.Secondary,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
