import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../../LeftSide/LogoSearch/LogoSearch'
import FollowersCart from '../../LeftSide/FollowersCart/FollowersCart'
import ProfileCard from '../../LeftSide/ProfileCard/ProfileCard'

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <ProfileCard />
      <FollowersCart/>
    </div>
  )
}

export default ProfileSide
