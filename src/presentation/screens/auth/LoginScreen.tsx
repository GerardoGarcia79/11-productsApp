import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    // eslint-disable-next-line curly
    if (wasSuccessful) return;

    Alert.alert('Error', 'Invalid email or password');
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Sign In</Text>
          <Text category="p2">Please sign in to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="mail-outline" />}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            secureTextEntry
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-closed-outline" />}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLogin}>
            Sign In
          </Button>
        </Layout>

        {/* Create account information */}
        <Layout style={{height: 20}} />
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Don't have an account?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {' '}
            Create one
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
