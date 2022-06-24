import React from 'react'
import ProfileSide from '../ProfileSide/ProfileSide'
import './Home.css'
const Home = () => {
    return (
        <div className='Home'>
            <ProfileSide />
            <div className="postSide">post</div>
            <div className="righteSide">righteSide</div>
        </div>
    )
}

export default Home
