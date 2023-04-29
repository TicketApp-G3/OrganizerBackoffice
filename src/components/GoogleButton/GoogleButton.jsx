import React, { useContext } from 'react'
import { Button } from '@mantine/core'
import './GoogleButtonStyles.css'
import { AuthContext } from '../../contexts/AuthProvider'

const GoogleButton = () => {
  const { login } = useContext(AuthContext)
  return (
    <Button onClick={login} className="buttonContainer">
      Google +
    </Button>
  )
}

export default GoogleButton
