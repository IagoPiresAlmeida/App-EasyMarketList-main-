import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import NewList from './NewList';
import ModelList from './ModelList';
import Carrinho from './Carrinho';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewList" component={NewList} />
        <Stack.Screen name="ModelList" component={ModelList} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;