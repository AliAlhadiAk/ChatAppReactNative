import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';
import { Image,Text } from 'react-native';

const ChatRoomHeader = ({ user }:{user:any}) => {
    const router = useRouter();
    useEffect(()=>{
      console.log(user)
    },[])
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false, // Ensure header is shown
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
            <TouchableOpacity onPress={()=>router.back()}>
              <Entypo name='chevron-left' size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View style={[tw`flex-row items-center`,{gap:12}]}>
               <Image
                source={user?.profileUrl || "http://ts4.mm.bing.net/th?id=OIP.Sr4fxChDzgG6T-SG4zCS8wHaHa&pid=15.1" }
                style={{height:hp(4.5),aspectRatio:1,borderRadius:100}}
              
               />
                 <Text style={[{fontSize:hp(2.5)},tw`text-gray-700 font-medium `]}>
                    {user?.userName}
                 </Text>
            </View>
          </View>
        ),
        headerRight:() => (
            <View style={[tw`flex-row items-center`,{gap:32}]}> 
               <Ionicons name='call' size={hp(3.0)} color={"#737373"}/>
               <Ionicons name='videocam' size={hp(3.8)} color={"#737373"}/>

            </View>
        )
      }}
    />
  );
};

export default ChatRoomHeader;
