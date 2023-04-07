import React, { useState } from 'react'
import { Flex } from '@mantine/core'
import FaqForm from './FaqForm'

const FaqsEventForm = ({ formState }) => {
  const [faqs, setFaqs] = useState([])
  const [faqsAmount, setFaqsAmount] = useState(1)

  const handleAddFaq = (speakInfo) => {
    setFaqs((prevState) => [...prevState, speakInfo])
    formState.getInputProps('faqs').onChange([...faqs, speakInfo])
    setFaqsAmount(faqsAmount + 1)
  }

  return (
    <Flex gap={14} direction="column">
      {[...Array(faqsAmount)].map((_, index) => (
        <FaqForm key={index} onSubmit={handleAddFaq} />
      ))}
    </Flex>
  )
}

export default FaqsEventForm
