import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import MessageItem from './MessageItem'

const MessageList = ({messages,currentUser}:{messages:any,currentUser:any}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
    {
        messages.map((message:any,index:any) => (
            <MessageItem key={index} messages={message} currentUser={currentUser}/>
        ))
    }
    </ScrollView>
  )
}

export default MessageList