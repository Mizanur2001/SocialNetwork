import React, { useState } from 'react'
import TrendCard from '../TrendCard/TrendCard'
import HomeImg from '../../../img/home.png'
import MessageImg from '../../../img/comment.png'
import NotiImg from '../../../img/noti.png'
import { UilSetting } from '@iconscout/react-unicons'
import './RightSide.css'
import ShareModel from '../../Models/ShareModel/ShareModel'


const RightSide = () => {

  const [openModel, setOpenModel] = useState(false)

  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={HomeImg} alt="home" />
        <UilSetting />
        <img src={MessageImg} alt="notification" />
        <img src={NotiImg} alt="message" />
      </div>

      <TrendCard />
      <button className='btn rs-btn' onClick={() => setOpenModel(true)}>Share</button>
      <ShareModel openModel={openModel} setOpenModel={setOpenModel} />
    </div >
  )
}

export default RightSide
