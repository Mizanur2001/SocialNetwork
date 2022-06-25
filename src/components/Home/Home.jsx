import React from 'react'
import ProfileSide from '../ProfileSide/ProfileSide'
import PostSide from '../PostSide/PostSide'
import RightSide from '../RightSide/RightSide'
import './Home.css'

const Home = () => {
    return (
        <div className='Home'>
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    )
}

export default Home
