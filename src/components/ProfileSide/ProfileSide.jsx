import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCart from '../FollowersCart/FollowersCart'
import ProfileCard from '../ProfileCard/ProfileCard'


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
