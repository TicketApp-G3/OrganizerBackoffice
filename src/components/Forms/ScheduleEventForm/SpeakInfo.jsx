import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'

const SpeakInfo = ({ data }) => {
  const theme = useMantineTheme()

  const { presenter, speakTitle, speakDescription, startTime } = data
  return (
    <div
      className="formContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <Text>
        <b>Nombre:</b> {presenter}
      </Text>
      <Text>
        <b>Título:</b> {speakTitle}
      </Text>
      <Text>
        <b>Descripción:</b> {speakDescription}
      </Text>
      <Text>
        <b>Hora de inicio:</b> {startTime}hs
      </Text>
    </div>
  )
}

export default SpeakInfo
