import '../gesture-handler';
import * as eva from '@eva-design/eva';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme} from 'react-native';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {IonIconsPack} from './ion-icons';
import {AuthProvider} from './presentation/providers/AuthProvider';

// ApplicationProvider is used to provide the theme to the app
// Is not recommended to implement different themes in a store app
// But here is implemented to show how to use themes with ui-kitten
export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];
  return (
    <>
      <IconRegistry icons={IonIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        {/* Added Layout with the backgroundColor and theme prop in NavigationContainer to avoid "white flash" in dark mode when navigating */}
        <Layout style={{flex: 1, backgroundColor}}>
          <NavigationContainer
            theme={{
              dark: colorScheme === 'dark',
              colors: {
                primary: theme['color-primary-500'],
                background: backgroundColor,
                card: theme['color-basic-100'],
                text: theme['text-basic-color'],
                border: theme['color-basic-800'],
                notification: theme['color-primary-500'],
              },
              fonts: DefaultTheme.fonts,
            }}>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </NavigationContainer>
        </Layout>
      </ApplicationProvider>
    </>
  );
};
