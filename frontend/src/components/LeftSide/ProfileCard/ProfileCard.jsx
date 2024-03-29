import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cover from '../../../img/cover1.jpg'
import profile from '../../../img/profilePic.jpg'
import './ProfileCard.css'
import axios from 'axios'

const ProfileCard = (userId) => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [url, setUrl] = useState(window.location.href)
    const [userInfo, setUserInfo] = useState("")
    const [noOfPosts, setNoOfPosts] = useState([])
    const [addiInfo, setAddiInfo] = useState(false)
    const Navigate = useNavigate()
    let ProfilePage = false


    useEffect(() => {
        setUrl(window.location.href)
        const API = axios.create({ baseURL: `${URL}` })
        API.get(`/user/${userId.id ? userId.id : localStorage.getItem('userId')}`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Response => setUserInfo(Response.data)).catch(err => console.log(err))

        axios.get(`${URL}/post/user/posts`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Response => setNoOfPosts(Response.data)).catch(err => console.log(err))

        if (userId.id !== undefined) {
            setAddiInfo(true)
        }
        
    }, [userId.id, URL])


    if (url.includes('/profile')) {
        ProfilePage = true

    }

    return (
        <div className='ProfileCard'>
            <div className="ProfileImages">
                <img src={userInfo.coverpicture ? process.env.REACT_APP_PUBLIC_IMG_FOLDER + userInfo.coverpicture : cover} alt="coverImage" />
                <img src={userInfo.profilepicture ? process.env.REACT_APP_PUBLIC_IMG_FOLDER + userInfo.profilepicture : profile} alt="profileImage" />
            </div>
            <div className="ProfileName">
                <span>{userInfo === "" ? "Loading..." : userInfo.firstname} {userInfo.lastname}</span>
                {!ProfilePage && <span>{userInfo.about ? userInfo.about.length >= 25 ? userInfo.about.slice(0, 25) + "..." : userInfo.about : "No Info :("}</span>}
                {ProfilePage && <span>{userInfo.about ? userInfo.about : "No Info :("}</span>}

            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{userInfo === "" ? "loading..." : userInfo.following.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{userInfo === "" ? "loading..." : userInfo.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    {
                        ProfilePage &&
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{noOfPosts.length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    }
                </div>
                <hr />
                {ProfilePage && <div></div>}
            </div>

            {!ProfilePage &&
                <span className='ViewMyProfile' onClick={() => Navigate("/profile")}>
                    My Profile
                </span>
            }
            {addiInfo &&
                <div className='userAddiInfo'>
                    <div className='iconAndInfo'>
                        <span className="material-symbols-outlined">
                            work
                        </span>
                        <p><b>Works At</b> : {userInfo.worksat}</p>
                    </div>
                    <div className='iconAndInfo'>
                        <span className="material-symbols-outlined">
                            diversity_4
                        </span>
                        <p> <b>Relationship</b> : {userInfo.relationship}</p>
                    </div>
                    <div className='iconAndInfo'>
                        <span className="material-symbols-outlined">
                            location_city
                        </span>
                        <p><b>Lives At</b> : {userInfo.liverin}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileCard
