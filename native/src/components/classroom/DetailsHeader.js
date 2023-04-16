import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalColors, globalStyles} from '../../styles/styles';

export default function DetailsHeader({currentClass}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{...globalStyles.textTitle, flexWrap: 'wrap'}}>
          {currentClass.subjectName}
        </Text>
        <Text style={{...globalStyles.textSubTitle, color: globalColors.Gray}}>
          {currentClass.className} - {currentClass.subjectCode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: globalColors.Primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
