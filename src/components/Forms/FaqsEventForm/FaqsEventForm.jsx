import React, { useState } from 'react'
import { Flex, Text } from '@mantine/core'
import FaqForm from './FaqForm'
import FaqInfo from './FaqInfo'

const FaqsEventForm = ({ formState, isPublished, isDraft }) => {
  const [faqs, setFaqs] = useState(formState.values.faqs)
  const canEdit = isPublished || isDraft

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
      {!faqs.length && !canEdit ? (
        <Text>No hay Faqs</Text>
      ) : (
        faqs.map((faq, index) => (
          <FaqInfo
            faq={faq}
            key={index}
            onDelete={() => handleDeleteFaq(index)}
            canEdit={canEdit}
          />
        ))
      )}
      {canEdit && <FaqForm onSubmit={handleAddFaq} />}
    </Flex>
  )
}

export default FaqsEventForm
