import { Text, useMantineTheme } from '@mantine/core'
import React from 'react'
import DeleteButton from '../../DeleteButton/DeleteButton'
import './FaqInfoStyles.css'

const FaqInfo = ({ faq, onDelete }) => {
  const theme = useMantineTheme()

  const { question, answer } = faq

  return (
    <div
      className="formContainer"
      style={{ borderColor: theme.colors.gray[5] }}
    >
      <DeleteButton onClick={onDelete} />
      <Text fw="bold">{question}</Text>
      <Text>{answer}</Text>
    </div>
  )
}

export default FaqInfo
