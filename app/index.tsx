import { View, Text, Platform, TouchableOpacity, Pressable, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const ios = Platform.OS === 'ios';
  const router = useRouter();
  return (
    <View style={[tw`flex-1`,{marginTop:ios? -2 : 15}]}>
      <StatusBar style='dark' />
      <View style={[tw`flex-1 items-center justify-around`, { paddingHorizontal: wp(4) }]}>
        <Image
          source={require('../assets/welcome-socialmedia.png')}
          resizeMode='contain'
          style={[{ height: hp(30), width: wp(100) }]}
        />
        <View style={[{ gap: 20 }, tw`justify-center items-center`]}>
          <Text style={[{ fontSize: wp(10) }, tw`text-center font-bold`]}>LinkUp!</Text>
          <Text style={[{ width: wp(75), fontSize: wp(4) }, tw`text-center`]}>
            Where every thought finds a home and every image tells a story
          </Text>
        </View>

        <View style={[tw`items-center`, { width: wp(88), gap: 15 }]}>
          <TouchableOpacity style={[tw`bg-green-400 p-3 rounded-xl shadow-lg`, { width: '100%' }]} onPress={() => router.push('signup')}>
            <Text style={[{ fontSize: wp(5) }, tw`mx-auto text-white font-semibold`]} >Get Started</Text>
          </TouchableOpacity>
          <View style={[tw`flex-row`, { gap: wp(2) }]}>
            <Text style={{ fontSize: wp(4) }}>Already have an account?</Text>
            <Pressable>
              <Text style={[{ fontSize: wp(4) }, tw`text-green-400`]} onPress={() => router.push('signin')}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
