import React, { useState, useEffect } from 'react'
import './FollowersCart.css'
import defaulfImg from '../../../img/profilePic.jpg'
import Seach from '../LogoSearch/LogoSearch'
import { Loader } from '@mantine/core';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FollowersCart = () => {
    const navigate = useNavigate()
    const URL = process.env.REACT_APP_BACKEND_URL
    const [allUser, setAllUsers] = useState([]);
    const [following, setfollowing] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${URL}/users/`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => { setAllUsers(Responce.data); setLoading(false) }).catch(err => console.log(err))

        axios.get(`${URL}/user/${localStorage.getItem('userId')}`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => setfollowing(Responce.data.following)).catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    const funcFollowUnfollow = (id) => {
        if (!following.includes(id)) {
            axios.put(`${URL}/user/${id}/follow`, {
                _id: localStorage.getItem('userId')
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Responce => { window.location.reload() }).catch(err => console.log(err))

        }
        if (following.includes(id)) {
            axios.put(`${URL}/user/${id}/unfollow`, {
                _id: localStorage.getItem('userId')
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Responce => { window.location.reload() }).catch(err => console.log(err))

        }
    }

    const funcFollowerInfo = (follower) => {
        navigate(`/profile/${follower._id}`)
    }

    return (
        <div className='FollowersCarts'>
            <div className="seach">
                <Seach data={allUser} />
            </div>
            <h3>All Users</h3>
            {loading && <div className='loder'>
                <Loader color="grape" />
            </div>}
            {allUser.map((follower, id) => {
                return (
                    <div className="follower" key={id}>
                        <div className='followerInfo' onClick={() => funcFollowerInfo(follower)}>
                            <img src={follower.profilepicture ? process.env.REACT_APP_PUBLIC_IMG_FOLDER + follower.profilepicture : defaulfImg} alt="followerImg" className='followerImg' />
                            <div className="name">
                                <span>{follower.firstname} {follower.lastname}</span>
                                <span>@{follower.username}</span>
                            </div>
                        </div>
                        <button className='btn followBtn' onClick={() => funcFollowUnfollow(follower._id)}>
                            {following.includes(follower._id) ? 'Unfollow' : "Follow"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default FollowersCart
