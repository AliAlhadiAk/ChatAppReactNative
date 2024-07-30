import { View, Text } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/MaterialIcons'

const User = ({name,size,color}:{name:string,size:number,color:any}) => {
  return (
   <Icon name={name} size={size} color={color}/>
  )
}

export default User