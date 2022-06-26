import React from 'react'
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from '../../MiddleSide/PostShare/PostShare'

const ShareModel = ({ openModel, setOpenModel }) => {
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
                opened={openModel}
                onClose={() => setOpenModel(false)}
            >
                <div>
                    <PostShare />
                </div>
            </Modal>
        </div>
    )
}

export default ShareModel
