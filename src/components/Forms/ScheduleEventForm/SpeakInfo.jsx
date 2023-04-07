import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'

const SpeakInfo = ({ data }) => {
  const theme = useMantineTheme()

  const { speaker, speakTitle, speakDescription } = data
  return (
    <div
      className="speakerContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <Text>
        <b>Nombre del orador:</b> {speaker}
      </Text>
      <Text>
        <b>Nombre de la charla:</b> {speakTitle}
      </Text>
      <Text>
        <b>Descripción:</b> {speakDescription}
      </Text>
    </div>
  )
}

export default SpeakInfo
