import React, { useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../../Models/ProfileModel/ProfileModel'

const InfoCart = () => {

    const [modelOpen, setModelOpen] = useState(false)

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
                    In Relationship
                </span>
            </div>

            <div className="Info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>
                    Kolkata
                </span>
            </div>
            <div className="Info">
                <span>
                    <b>Works at </b>
                </span>
                <span>
                    TCS
                </span>
            </div>

            <div className="btn logoutBtn">
                Logout
            </div>
        </div>
    )
}

export default InfoCart
