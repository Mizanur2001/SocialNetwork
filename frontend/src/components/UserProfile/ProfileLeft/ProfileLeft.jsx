import React from 'react'
import './ProfileLeft.css'
import LogoSearch from '../../LeftSide/LogoSearch/LogoSearch'
import FollowersCart from '../../LeftSide/FollowersCart/FollowersCart'
import InfoCard from '../InfoCard/InfoCard'
import '../../LeftSide/ProfileSide/ProfileSide.css'

const ProfileLeft = () => {
    return (
        <div className='ProfileLeft ProfileSide'>
            <LogoSearch />
            <InfoCard/>
            <FollowersCart />
        </div>
    )
}

export default ProfileLeft
