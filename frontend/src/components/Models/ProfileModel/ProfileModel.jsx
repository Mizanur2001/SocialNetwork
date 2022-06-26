import { Modal, useMantineTheme } from "@mantine/core";
import './ProfileModel.css'

import React from 'react'

const ProfileModel = ({ modelOpen, setModelOpen }) => {
    const theme = useMantineTheme();
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
                <form action="#" className="SignUp">
                    <h3 className='gradientText'>Your Info</h3>
                    <div className="InpName">
                        <input type="text" placeholder='First Name' name='firstName' className='InfoInput' />
                        <input type="text" placeholder='Last Name' name='lastName' className='InfoInput' />
                    </div>
                    <div className="InpName">
                        <input type="text" placeholder='Viles In' name='livesin' className='InfoInput' />
                        <input type="text" placeholder='Works At' name='worksat' className='InfoInput' />
                    </div>

                    <input type="text" placeholder='Relationship Status' name='livesin' className='InfoInput w-60' />

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
