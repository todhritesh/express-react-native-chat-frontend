import React, { useEffect } from 'react'
import Friends from '../components/friends'
import ThemeBox from '../components/ThemeBox'
import requestPushNotificationPermission from '../permissions/notification'

const FriendsScreen = () => {
  useEffect(()=>{
    requestPushNotificationPermission()
  },[])
  return (
    <ThemeBox >
      <Friends />
    </ThemeBox>
  )
}

export default FriendsScreen