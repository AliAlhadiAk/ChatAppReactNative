import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/Context/authContext';
import { getRoomId } from '@/utils/common';
import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { FireStore } from '@/firebase/firebaseConfig';
import { collectManifestSchemes } from 'expo-linking';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';


const ChatRoom = () => {
    const item = useLocalSearchParams();
    const [messages,setMessages] = useState<any>([]);
    const {user} = useAuth();
    const [text,setText] = useState('')

    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(user?.uid,item.userId);
        const docRef = doc(FireStore,'rooms',roomId)
        const messageRef = collection(docRef,"messages")
        const q = query(messageRef,orderBy('createdAr','asc'))


        const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const allMessages: Message[] = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data() as Omit<Message, 'id'>,
            }));
            setMessages([...allMessages]);
          }, (error) => {
            console.error('Error fetching messages:', error);
          });
      
          return () => unsub();

    },[])

    const handleSendMessages = async () => {
         let message= text.trim();
         if(!message) return;
         try{
           let roomId = getRoomId(user?.uid,item.userId);
           const docRef = doc(FireStore,'rooms',roomId);
           const messagesRef = collection(docRef,"messages");
           const newDoc = await addDoc(messagesRef,{
            userId:user?.uid,
            text,
            profileUrl:user?.photoURL,
            senderName:user?.displayName,
            createdAr: Timestamp.fromDate(new Date())
           })
          setText('')
         }
         catch(error){
           console.log(error)
         }
    }

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.uid,item?.userId);
        await setDoc(doc(FireStore,'rooms',roomId),{
            roomId,
            createdAt:Timestamp.fromDate(new Date())
        })
    }
    console.log(messages)
  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style='dark'/>
      <ChatRoomHeader user={item}/>
      <View style={tw`h-3 border-b border-gray-300`}></View>
      <View style={tw`flex-1 justify-between bg-gray-100 overflow-visible`}>
    
      <View style={tw`flex-1`}>
        <MessageList messages={messages} currentUser={user}/>
      </View>
      <View style={[tw`pt-2`,{marginBottom:hp(1.7)}]}>
        <View style={tw`flex-row justify-between items-center mx-3`}>
          <View style={tw`flex-row justify-between bg-white border p-2 border-gray-300 rounded-full pl-5`}>
           <TextInput
           placeholder='Type messages ...'
           style={[{fontSize:hp(2)},tw`flex-1 mr-2`]}
           value={text}
           onChangeText={(text)=> setText(text)}
           />
           <TouchableOpacity onPress={handleSendMessages} style={tw`bg-gray-200 p-2 mr-1 rounded-full`}>
             <Feather name='send' size={hp(2.7)} color={"#737373"}/>
           </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </View>
  )
}

export default ChatRoom