import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { Input } from 'react-native-elements';
import Mail from '@/components/mail';
import Lock from '@/components/LockIcon';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/Context/authContext';
import { useState } from 'react';

const SignIn = () => {
  const router = useRouter();
  const {login} = useAuth();


  
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [error,setError] = useState('');

  const LogiAsync = async (email:string,password:string) => {
    if(!email || !password){
         setError('Please fill all the credentials')
    }
    else{
        await login(email,password).then(()=> router.replace('/home'))
       
    }
      
    
    
  }

  useEffect(() => {
    setError('')
  },[email,pass])


  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={[tw`p-4`]}>
        <Pressable style={[tw`bg-gray-400 p-3 rounded-xl`, { width: wp(10), height: wp(10), justifyContent: 'center', alignItems: 'center' }]} onPress={() => router.back()}>
          <Icon name="arrow-left" size={wp(6)} color="#000" />
        </Pressable>
      </View>
      <View style={[tw``, { paddingHorizontal: wp(4) ,marginTop:hp(4),paddingLeft:wp(5)}]}>
        <Text style={[tw` font-bold`, { fontSize: wp(8) }]}>Hey!, </Text>
        <Text style={[tw` font-bold`, { fontSize: wp(8) }]}>Welcome Back</Text>
      </View>
      <View style={[{paddingLeft:wp(5),marginTop:hp(5)}]}>
      <Text>Please Login to continue</Text>
      </View>
      {
        error && (
            <Text style={tw`text-center mt-2 text-red-400`}>{error}</Text>
        )
      }
      <View>
      <View style={[{marginTop:hp(3),paddingLeft:wp(5),gap:14,width:wp(90)},tw` mx-auto p-4 flex-row border border-gray-300 rounded-2xl  items-center`]}>
        <Mail name='mail' color={'#000'} size={20}/>
        <TextInput
         placeholder='Enter your email'
         value={email}
         onChangeText={(text)=> setEmail(text)}
        />  
      </View>
      <View style={[{marginTop:hp(3),paddingLeft:wp(5),gap:14,width:wp(90)},tw` mx-auto p-4 flex-row border border-gray-300 rounded-2xl  items-center`]}>
        <Lock name='lock' color={'#000'} size={20}/>
        <TextInput
         placeholder='Enter your email'
         value={pass}
         onChangeText={(text)=> setPass(text)}
        />  
      </View>
      <Text style={[tw`text-right`,{marginTop:hp(3),paddingRight:hp(2)}]}>Forgot Password?</Text>
      </View>
      <View style={[{width:wp(90),marginTop:hp(4)},tw`mx-auto`]}>
      <TouchableOpacity style={[tw`bg-green-400 p-3 rounded-xl shadow-lg`, { width: '100%' }]} onPress={() => LogiAsync(email,pass)}>
            <Text style={[{ fontSize: wp(5) }, tw`mx-auto text-white font-semibold`]} >Sign In</Text>
          </TouchableOpacity>
      </View>
      <View style={[{marginTop:hp(5),gap:wp(1)},tw`mx-auto flex-row`]}>
        <Text style={{fontSize:wp(4)}}>Dont have an account?</Text>
        <Pressable>
              <Text style={[{ fontSize: wp(4) }, tw`text-green-400`]} onPress={() => router.push('signup')}>Register</Text>
            </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default SignIn;
