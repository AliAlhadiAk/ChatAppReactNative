import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { collection, doc, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { formatDate, getRoomId } from '@/utils/common';
import { useAuth } from '@/Context/authContext';
import { FireStore } from '@/firebase/firebaseConfig';

const DEFAULT_PHOTO_URL = '';

const ChatItem = ({ item }: { item:any}) => {
  const photoUrl =  DEFAULT_PHOTO_URL;
  const router= useRouter();
  const {user} = useAuth();
  const OpenChatRoom = () =>{
    router.push({pathname:'/ChatRoom',params:item});
  

  }
  const [lastMessage,setLastMessage] = useState<any>('')

  useEffect(() => {
    let roomId = getRoomId(user?.uid,item.userId);
    const docRef = doc(FireStore,'rooms',roomId)
    const messageRef = collection(docRef,"messages")
    const q = query(messageRef,orderBy('createdAr','asc'))

    const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const allMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as Omit<Message, 'id'>,
      }));
      setLastMessage(allMessages[allMessages.length -1]?allMessages[allMessages.length -1]:null);
    }, (error) => {
      console.error('Error fetching messages:', error);
    });

    return () => unsub();

  },[]);

  const renderTime = () =>{
      if(lastMessage){
        const date= lastMessage?.createdAr
        return formatDate(new Date(date?.seconds * 1000))
      }
  }
  const RenderLastMessage = () =>{
    if(lastMessage){
       if(user?.uid == lastMessage?.userId){
        return "You :"+lastMessage?.text;
       }
       return lastMessage.text
    }
    else{

    }
  }

   return (
    <TouchableOpacity onPress={OpenChatRoom} style={[tw`flex-row items-center p-4 border-b border-gray-200`,{gap:10}]}>
      <Image
        source={{ uri: item?.profileUrl }}
        style={[tw`rounded-full`,{height:hp(6),width:hp(6)}]}
      />
      <View style={tw`flex-1 justify-between`}>
        <Text style={[{fontSize:hp(1.6)},tw`font-semibold text-gray-800`]}>{item.userName
        }</Text>
        <Text style={[{fontSize:hp(1.6)},tw`font-medium text-gray-500`]}>{RenderLastMessage()}</Text>

      </View>
      <Text style={[{fontSize:hp(1.6)},tw`font-medium text-gray-500`]}>{renderTime()}</Text>
    </TouchableOpacity>
  );
};

export default ChatItem;
const renderTime = () =>{
    
}