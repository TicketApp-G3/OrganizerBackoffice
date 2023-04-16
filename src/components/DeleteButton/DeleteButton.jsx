import React from 'react'
import { ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import './DeleteButtonStyles.css'

const DeleteButton = ({ onClick }) => {
  return (
    <ActionIcon onClick={onClick} className="deleteImageButton">
      <IconTrash variant="filled" size={24} color="white" />
    </ActionIcon>
  )
}

export default DeleteButton
