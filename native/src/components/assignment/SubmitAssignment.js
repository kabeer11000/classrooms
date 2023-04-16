import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Headline, Title} from 'react-native-paper';
import {globalColors} from '../../styles/styles';
import SelectDocumentButton from '../../components/classroom/SelectDocumentButton';

export default function SubmitAssignment({
  loading,
  submission,
  setDocument,
  handleSubmit,
}) {
  return (
    <View style={styles.container}>
      <Headline style={{color: globalColors.Aqua}}>Submission</Headline>
      <SelectDocumentButton
        setDocument={setDocument}
        loading={loading}
        submission={submission}
      />
      <Button
        mode="contained"
        color={globalColors.Secondary}
        disabled={loading || submission !== null}
        onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: globalColors.Dark,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
  },
});
