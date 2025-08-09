import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {register} = useAuthStore();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isPosting, setIsPosting] = useState(false);
  const {height} = useWindowDimensions();

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await register(
      form.email,
      form.password,
      form.fullName,
    );
    setIsPosting(false);
    if (wasSuccessful) {
      navigation.navigate('LoginScreen');
      return;
    }
    Alert.alert(
      'Error',
      'An error occurred during registration. Please try again.',
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Sign Up</Text>
          <Text category="p2">Please sign up to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Full Name"
            onChangeText={fullName => setForm({...form, fullName})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => setForm({...form, email})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="mail-outline" />}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={password => setForm({...form, password})}
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
            onPress={onRegister}>
            Sign Up
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
          <Text>Already have an account?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            {' '}
            Sign In
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
