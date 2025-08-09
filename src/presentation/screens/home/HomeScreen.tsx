import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">H1</Text>

      <Button
        onPress={logout}
        accessoryLeft={<Icon name="log-out-outline" size={20} />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
