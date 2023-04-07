import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'

const FaqInfo = ({ data }) => {
  const theme = useMantineTheme()

  const { question, answer } = data
  return (
    <div
      className="speakerContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <Text fw="bold">{question}</Text>
      <Text>{answer}</Text>
    </div>
  )
}

export default FaqInfo
