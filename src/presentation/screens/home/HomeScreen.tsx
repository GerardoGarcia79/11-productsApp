import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

export const HomeScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">H1</Text>

      <Button accessoryLeft={<Icon name="logo-facebook" size={20} />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
