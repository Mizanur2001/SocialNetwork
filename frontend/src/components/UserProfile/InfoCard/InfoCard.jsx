import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../../Models/ProfileModel/ProfileModel'
import axios from 'axios'

const InfoCart = () => {
    const [userInfo, setUserInfo] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${localStorage.getItem('userId')}`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => setUserInfo(Responce.data)).catch(err => console.log(err))
    }, [])

    const Navigate = useNavigate()
    const [modelOpen, setModelOpen] = useState(false)

    const funcLogout = () => {
        localStorage.clear("authToken")
        document.location.reload()
        Navigate("/Auth")
    }

    return (
        <div className='InfoCard'>
            <div className="InfoHead">
                <h4>Your info</h4>
                <UilPen width='2rem' height='1.3rem' onClick={() => setModelOpen(true)} />
            </div>
            <ProfileModal modelOpen={modelOpen} setModelOpen={setModelOpen} />
            <div className="Info">
                <span>
                    <b>Status </b>
                </span>
                <span>
                    {userInfo ? userInfo.relationship ? userInfo.relationship : "No Info :(" : "Loading..."}
                </span>
            </div>

            <div className="Info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>
                    {userInfo ? userInfo.liverin ? userInfo.liverin : "No Info :(" : "Loading..."}
                </span>
            </div>
            <div className="Info">
                <span>
                    <b>Works at </b>
                </span>
                <span>
                    {userInfo ? userInfo.worksat ? userInfo.worksat : "No Info :(" : "Loading..."}
                </span>
            </div>

            <div className="btn logoutBtn" onClick={funcLogout}>
                Logout
            </div>
        </div>
    )
}

export default InfoCart
