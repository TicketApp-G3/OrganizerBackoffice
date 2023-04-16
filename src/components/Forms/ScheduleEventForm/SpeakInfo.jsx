import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'

const SpeakInfo = ({ speaker }) => {
  const theme = useMantineTheme()

  const { presenter, title, description, timeFrom } = speaker
  return (
    <div
      className="formContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <Text>
        <b>Nombre:</b> {presenter}
      </Text>
      <Text>
        <b>Título:</b> {title}
      </Text>
      <Text>
        <b>Descripción:</b> {description}
      </Text>
      <Text>
        <b>Hora de inicio:</b> {timeFrom}hs
      </Text>
    </div>
  )
}

export default SpeakInfo
