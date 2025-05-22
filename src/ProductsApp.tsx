import '../gesture-handler';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme} from 'react-native';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {IonIconsPack} from './ion-icons';

// ApplicationProvider is used to provide the theme to the app
// Is not recommended to implement different themes in a store app
// But here is implemented to show how to use themes with ui-kitten
export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={IonIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
