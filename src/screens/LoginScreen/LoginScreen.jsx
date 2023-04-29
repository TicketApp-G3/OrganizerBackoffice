import React from 'react'
import { Box, Text } from '@mantine/core'
import './LoginScreenStyles.css'
import GoogleButton from '../../components/GoogleButton/GoogleButton'

const LoginScreen = () => {
  return (
    <div className="loginScreenContainer">
      <Box className="card">
        <Text className="cardTitle">Ingresa al backoffice</Text>
        <Text className="cardText">
          Accede al backoffice para organizadores y gestiona tus eventos de
          manera efectiva.
        </Text>
        <Text className="cardText">
          Ingresa con tu cuenta de Google para continuar.
        </Text>
        <GoogleButton />
      </Box>
    </div>
  )
}

export default LoginScreen
