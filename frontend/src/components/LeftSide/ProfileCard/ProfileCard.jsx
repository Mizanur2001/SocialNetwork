import React from 'react'
import cover from '../../../img/cover1.jpg'
import profile from '../../../img/sruti.jpg'
import './ProfileCard.css'

const ProfileCard = () => {

    const ProfilePage = true

    return (
        <div className='ProfileCard'>
            <div className="ProfileImages">
                <img src={cover} alt="coverImage" />
                <img src={profile} alt="profileImage" />
            </div>
            <div className="ProfileName">
                <span>Sruti Dey</span>
                <span>Python Developer</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>8,598</span>
                        <span>Followers</span>
                    </div>
                    {
                        ProfilePage &&
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>6</span>
                                <span>Posts</span>
                            </div>
                        </>
                    }
                </div>
                <hr />
                {ProfilePage && <div></div>}
            </div>

            {!ProfilePage &&
                <span className='ViewMyProfile'>
                    My Profile
                </span>
            }
        </div>
    )
}

export default ProfileCard
