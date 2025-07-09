import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

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
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="mail-outline" />}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-closed-outline" />}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => console.log('Login Pressed')}>
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
