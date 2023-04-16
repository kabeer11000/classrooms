import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {globalColors, globalStyles} from '../styles/styles';

export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator color={globalColors.Warning} size={36} />
    </View>
  );
}
