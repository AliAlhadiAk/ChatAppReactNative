import { View, Text, Platform } from 'react-native';
import React, { useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { blurhash } from '@/utils/common';
import { useAuth } from '@/Context/authContext';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { MenuItems } from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';
import { template } from '@babel/core';
import { Divider } from 'react-native-elements';

const HomeScreenHeader = ({users}:{users:any}) => {
    const ios = Platform.OS === 'ios';
    const { top } = useSafeAreaInsets();
    const { user, logout } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const handleProfile = () => {
        console.log('Profile clicked');
    }

    const handleLogout = async () => {
        await logout();
    }

    return (
        <View style={[tw`flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow`, { paddingTop: ios ? top : top + 10 }]}>
            <StatusBar style='light' />
            <View>
                <Text style={[{ fontSize: hp(3) }, tw`font-medium text-white`]}>Chats</Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                        }
                    }}>
                        <Image
                            style={{ height: hp(4.6), aspectRatio: 1, borderRadius: 100 }}
                            source={{ uri: user?.photoURL }} 
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                         customStyles={{
                          optionsContainer: {
                            borderRadius: 10,
                            marginTop: 40, 
                            marginLeft: -30, 
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 0, height: 0 }, 
                          },
                        }}
                      >

                        <MenuItems
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color={"#737373"} />}
                        />
                        <Divider/>
                        <MenuItems
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color={"#737373"} />}
                        />
                       
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
};

export default HomeScreenHeader;

