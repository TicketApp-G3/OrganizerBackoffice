import React, { useState } from 'react'
import { Flex, Text } from '@mantine/core'
import SpeakerForm from './SpeakerForm'
import './ScheduleEventFormStyles.css'

const ScheduleEventForm = ({ formState }) => {
  const [speak, setSpeak] = useState([])
  const [speaksAmount, setSpeaksAmount] = useState(1)

  const handleAddSpeak = (speakInfo) => {
    setSpeak((prevState) => [...prevState, speakInfo])
    formState.getInputProps('schedule').onChange([...speak, speakInfo])
    setSpeaksAmount(speaksAmount + 1)
  }

  return (
    <Flex gap={14} direction="column">
      {[...Array(speaksAmount)].map((_, index) => (
        <SpeakerForm key={index} onSubmit={handleAddSpeak} />
      ))}
    </Flex>
  )
}

export default ScheduleEventForm
