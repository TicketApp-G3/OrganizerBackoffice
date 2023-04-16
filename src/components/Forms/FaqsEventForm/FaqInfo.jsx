import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'

const FaqInfo = ({ faq }) => {
  const theme = useMantineTheme()

  const { question, answer } = faq
  return (
    <div
      className="formContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <Text fw="bold">{question}</Text>
      <Text>{answer}</Text>
    </div>
  )
}

export default FaqInfo
