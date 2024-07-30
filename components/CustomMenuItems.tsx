import { MenuOption } from "react-native-popup-menu";
import tw from "tailwind-react-native-classnames";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface MenuItemsProps {
    text: string;
    action: (value: any) => void; 
    value: any;
    icon: React.ReactNode; 
}

export const MenuItems = ({ text, action, value, icon }: MenuItemsProps) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View style={tw`px-4 py-1 flex-row justify-between items-center`}>
                <Text style={[{ fontSize: hp(1.7) }, tw`font-semibold text-gray-600`]}>{text}</Text>
                <View>{icon}</View>
            </View>
        </MenuOption>
    );
};
