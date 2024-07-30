import { View, Text, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import Mail from '@/components/mail'; 
import Lock from '@/components/LockIcon'; 
import User from '@/components/User'; 
import { useAuth } from '@/Context/authContext';

const SignUp = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const registerAsync = async () => {
    try {
      await register(email, pass, userName, profileImg)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={tw`p-4`}>
            <Pressable style={[tw`bg-gray-400 p-3 rounded-xl`, { width: wp(10), height: wp(10), justifyContent: 'center', alignItems: 'center' }]} onPress={() => router.back()}>
              <Icon name="arrow-left" size={wp(6)} color="#000" />
            </Pressable>
          </View>
          <View style={[tw`p-4`, { paddingHorizontal: wp(4), marginTop: hp(4) }]}>
            <Text style={[tw`font-bold`, { fontSize: wp(8) }]}>Let's, </Text>
            <Text style={[tw`font-bold`, { fontSize: wp(8) }]}>Get Started</Text>
          </View>
          <View style={[tw`p-4`, { paddingLeft: wp(5), marginTop: hp(5) }]}>
            <Text>Please fill in the details to create an account</Text>
          </View>
          <View style={tw`p-4`}>
            <View style={[tw`flex-row border border-gray-300 rounded-2xl items-center p-4`, { marginTop: hp(3), width: wp(90), gap: 14 }]}>
              <User name='account-circle' color='#000' size={20} />
              <TextInput
                placeholder='Enter your username'
                style={{ flex: 1 }} 
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
            <View style={[tw`flex-row border border-gray-300 rounded-2xl items-center p-4`, { marginTop: hp(3), width: wp(90), gap: 14 }]}>
              <Mail name='mail' color='#000' size={20} />
              <TextInput
                placeholder='Enter your email'
                style={{ flex: 1 }} 
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={[tw`flex-row border border-gray-300 rounded-2xl items-center p-4`, { marginTop: hp(3), width: wp(90), gap: 14 }]}>
              <Lock name='lock' color='#000' size={20} />
              <TextInput
                placeholder='Enter your password'
                style={{ flex: 1 }} 
                value={pass}
                onChangeText={(text) => setPass(text)}
                secureTextEntry
              />
            </View>
            <View style={[tw`flex-row border border-gray-300 rounded-2xl items-center p-4`, { marginTop: hp(3), width: wp(90), gap: 14 }]}>
              <Lock name='lock' color='#000' size={20} />
              <TextInput
                placeholder='photo Url'
                style={{ flex: 1 }} 
                value={profileImg}
                onChangeText={(text) => setProfileImg(text)}
                
              />
            </View>
            <View style={tw`mx-auto`} style={{ width: wp(90), marginTop: hp(4) }}>
              <TouchableOpacity style={[tw`bg-green-400 p-3 rounded-xl shadow-lg`, { width: '100%' }]} onPress={registerAsync}>
                <Text style={[{ fontSize: wp(5) }, tw`mx-auto text-white font-semibold`]} >Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ fontSize: wp(4) }}>Already have an account?</Text>
            <Pressable onPress={() => router.push('signin')}>
              <Text style={[{ fontSize: wp(4) }, tw`text-green-400`]} >Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles to ensure footer is visible
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between', // This will push footer to the bottom
  },
  footer: {
    alignItems: 'center',
    marginBottom: hp(4), // Adjust this value to ensure it's visible and not cut off
    marginTop: hp(5),
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default SignUp;
