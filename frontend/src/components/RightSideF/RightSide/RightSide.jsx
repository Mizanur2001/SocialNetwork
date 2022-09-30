import React, { useState } from 'react'
import TrendCard from '../TrendCard/TrendCard'
import HomeImg from '../../../img/home.png'
import MessageImg from '../../../img/comment.png'
import NotiImg from '../../../img/noti.png'
import { UilSetting } from '@iconscout/react-unicons'
import './RightSide.css'
import ShareModel from '../../Models/ShareModel/ShareModel'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const RightSide = () => {
  const Navigate = useNavigate()
  const [openModel, setOpenModel] = useState(false)
  const funcNavigate = () => {
    Navigate('/')
  }

  const funcComingSoon = () => {
    toast.info("Coming soon :)");
  }

  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={HomeImg} alt="home" onClick={funcNavigate} />
        <UilSetting onClick={funcComingSoon}/>
        <img src={MessageImg} alt="notification" onClick={funcComingSoon}/>
        <img src={NotiImg} alt="message" onClick={funcComingSoon}/>
      </div>

      <TrendCard />
      <button className='btn rs-btn' onClick={() => setOpenModel(true)}>Share</button>
      <ShareModel openModel={openModel} setOpenModel={setOpenModel} />
      <ToastContainer />
    </div >
  )
}

export default RightSide
