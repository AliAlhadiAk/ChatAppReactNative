import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const MessageItem = ({messages,currentUser}:{messages:any,currentUser:any}) => {
    console.log(currentUser)
  if(currentUser?.uid == messages.userId){
    return (
        <View style={tw`flex-row justify-end mb-3 mr-3`}>
              <View style={{width:wp(80)}}>
                <View style={tw`flex self-end rounded-2xl bg-white border border-gray-200 p-2`}>
                <Text style={{fontSize:hp(1.9)}}>
                    {messages?.text}
                 </Text>
                </View>
              
              </View>
        </View>
    )
  }
  else{
    return(
        <View style={[{width:wp(80)},tw`ml-3 mb-3`]}>
            <View style={tw`flex self-start p-3 px-4 bg-indigo-400 border-indigo-200 rounded-2xl`}>
                <Text style={{fontSize:hp(1.9),color:'white'}}>
                    {messages.text}
                </Text>
            </View>
        </View>
    )
  }
}

export default MessageItem