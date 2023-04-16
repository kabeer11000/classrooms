import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Details from '../components/material/Details';
import Loading from '../containers/Loading';
import {useMsg} from '../contexts/MsgContext';
import useClass from '../hooks/useClass';
import {globalStyles} from '../styles/styles';

export default function Material({route, navigation}) {
  const {setToast: setMsg} = useMsg();
  const {classId, materialId} = route.params;
  const {materials, error} = useClass(classId);
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    if (materials) {
      const data = materials?.find(item => item.id === materialId);
      if (data) {
        // console.log(data);
        setMaterial(data);
      } else {
        setMsg('No material found...');
        navigation.goBack();
      }
    }
  }, [materials, materialId, classId, setMsg, navigation]);

  useEffect(() => {
    if (error) {
      navigation.goBack();
    }
  }, [error, navigation]);

  return material !== null ? (
    <View style={globalStyles.component}>
      <Details content={material} type="material" />
    </View>
  ) : (
    <Loading />
  );
}
