import { View, FlatList } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import ChatItem from './ChatItem';

const ChatList = ({ users }: { users: any[] }) => {
  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ChatItem item={item} />}
      />
    </View>
  );
};

export default ChatList;
