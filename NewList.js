
import React, { useLayoutEffect } from 'react';


import ModelList from './ModelList'; // Importe o componente ModelList

const NewList = ({ route, navigation }) => {
  const { listName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: listName });
  }, [navigation, listName]);


  return <ModelList />; // Renderize o componente ModelList
};

export default NewList;
