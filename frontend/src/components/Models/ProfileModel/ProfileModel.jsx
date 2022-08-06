import { Modal, useMantineTheme } from "@mantine/core";
import './ProfileModel.css'
import { useState } from 'react'
import axios from 'axios'

import React from 'react'

const ProfileModel = ({ modelOpen, setModelOpen }) => {

    const [updateUser, setUpdateUser] = useState({ _id: localStorage.getItem('userId'), firstname: '', lastname: '', liverin: '', worksat: '', relationship: '', about: '' })
    const theme = useMantineTheme();

    const funcSubmit = (e) => {
        if (updateUser.firstname === "") { delete (updateUser.firstname) }
        if (updateUser.lastname === "") { delete (updateUser.lastname) }
        if (updateUser.liverin === "") { delete (updateUser.liverin) }
        if (updateUser.worksat === "") { delete (updateUser.worksat) }
        if (updateUser.relationship === "") { delete (updateUser.relationship) }
        if (updateUser.about === "") { delete (updateUser.about) }
        console.log(updateUser)
        e.preventDefault()
        axios.put(`http://localhost:5000/user/${localStorage.getItem('userId')}`, updateUser).then(Response => { setModelOpen(false) }).catch(err => console.log(err))
        document.location.reload()
    }

    const funcOnChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Modal
                overlayColor={
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
                size="55%"
                opened={modelOpen}
                onClose={() => setModelOpen(false)}
            >
                <form className="SignUp" onSubmit={funcSubmit}>
                    <h3 className='gradientText'>Your Info</h3>
                    <div className="InpName">
                        <input type="text" placeholder='First Name' name='firstname' className='InfoInput' onChange={funcOnChange} value={updateUser.firstname} autoComplete='off' />
                        <input type="text" placeholder='Last Name' name='lastname' className='InfoInput' value={updateUser.lastname} onChange={funcOnChange} autoComplete='off' />
                    </div>
                    <div className="InpName">
                        <input type="text" placeholder='Liles In' name='liverin' className='InfoInput' value={updateUser.liverin} onChange={funcOnChange} autoComplete='off' />
                        <input type="text" placeholder='Works At' name='worksat' className='InfoInput' value={updateUser.worksat} onChange={funcOnChange} autoComplete='off' />
                    </div>

                    <input type="text" placeholder='Relationship Status' name='relationship' className='InfoInput w-60' value={updateUser.relationship} onChange={funcOnChange} autoComplete='off' />
                    <input type="text" placeholder='About Yourself' name='about' className='InfoInput w-60' value={updateUser.about} onChange={funcOnChange} autoComplete='off' />

                    <div className="PrfileImgUpdate">
                        <span>Profile Image</span>
                        <input type="file" name='profileImg' />
                        <span>Cover Image</span>
                        <input type="file" name="coverImg" />
                    </div>
                    <div className='bottomPartSignUp'>
                        <button className="btn SignUpBtn" type='submit'>Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ProfileModel
