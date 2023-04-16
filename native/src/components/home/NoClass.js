import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';
import icons from '../../assets/icons';
import {globalColors, globalStyles} from '../../styles/styles';

const NoClass = () => {
  return (
    <View style={globalStyles.container}>
      <Image
        source={icons.empty}
        style={{
          width: 200,
          height: 200,
          opacity: 0.6,
        }}
      />
      <Subheading style={{color: globalColors.Danger}}>
        No classes joined or created by you...
      </Subheading>
    </View>
  );
};

export default NoClass;

const styles = StyleSheet.create({});
