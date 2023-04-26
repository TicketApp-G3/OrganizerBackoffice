import React, { useState } from 'react'
import { Flex } from '@mantine/core'
import FaqForm from './FaqForm'
import FaqInfo from './FaqInfo'

const FaqsEventForm = ({ formState }) => {
  const [faqs, setFaqs] = useState(formState.values.faqs)

  const handleAddFaq = (speakInfo) => {
    setFaqs((prevState) => [...prevState, speakInfo])
    formState.getInputProps('faqs').onChange([...faqs, speakInfo])
  }

  const handleDeleteFaq = (index) => {
    const faqsCopy = [...faqs]
    faqsCopy.splice(index, 1)
    setFaqs(faqsCopy)
    formState.getInputProps('faqs').onChange(faqsCopy)
  }

  return (
    <Flex gap={14} direction="column">
      {faqs.map((faq, index) => (
        <FaqInfo
          faq={faq}
          key={index}
          onDelete={() => handleDeleteFaq(index)}
        />
      ))}
      <FaqForm onSubmit={handleAddFaq} />
    </Flex>
  )
}

export default FaqsEventForm
