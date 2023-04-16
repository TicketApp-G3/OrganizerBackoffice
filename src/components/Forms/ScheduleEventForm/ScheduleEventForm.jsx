import React, { useState } from 'react'
import { Flex } from '@mantine/core'
import SpeakerForm from './SpeakerForm'
import SpeakInfo from './SpeakInfo'

const ScheduleEventForm = ({ formState }) => {
  const [speakers, setSpeakers] = useState(formState.values.schedule)

  const handleAddSpeak = (speakInfo) => {
    setSpeakers((prevState) => [...prevState, speakInfo])
    formState.getInputProps('schedule').onChange([...speakers, speakInfo])
  }

  return (
    <Flex gap={14} direction="column">
      {speakers.map((speaker, index) => (
        <SpeakInfo speaker={speaker} key={index} />
      ))}
      <SpeakerForm onSubmit={handleAddSpeak} />
    </Flex>
  )
}

export default ScheduleEventForm
