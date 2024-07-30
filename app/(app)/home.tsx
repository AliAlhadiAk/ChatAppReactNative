import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeScreenHeader from '@/components/HomeScreenHeader';
import { useAuth } from '@/Context/authContext';
import tw from 'tailwind-react-native-classnames';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from './ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebase/firebaseConfig';

const Home = () => {
  const { fetchUsers,user } = useAuth();
  const [users, setUsers] = useState<any[]>([{
    id:1,name:"ali"
  }]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const q = query(usersRef,where("userId","!=",user?.uid));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach(doc => {
           users.push({...doc.data()})
        })
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <View style={[tw`flex items-center`, { top: hp(30) }]}>
        <ActivityIndicator size={hp(10)} color={"gray"} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <HomeScreenHeader users = {users}/>
      <ChatList users={users} />
    </View>
  );
};

export default Home;
