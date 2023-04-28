import React, { useState } from 'react'
import { Flex, Text } from '@mantine/core'
import SpeakerForm from './SpeakerForm'
import SpeakInfo from './SpeakInfo'

const ScheduleEventForm = ({ formState, canEdit }) => {
  const [speakers, setSpeakers] = useState(formState.values.schedule)

  const handleAddSpeak = (speakInfo) => {
    setSpeakers((prevState) => [...prevState, speakInfo])
    formState.getInputProps('schedule').onChange([...speakers, speakInfo])
  }

  const handleDeleteSpeak = (index) => {
    const speakersCopy = [...speakers]
    speakersCopy.splice(index, 1)
    setSpeakers(speakersCopy)
    formState.getInputProps('schedule').onChange(speakersCopy)
  }

  return (
    <Flex gap={14} direction="column">
      {!speakers.length ? (
        <Text>No hay agenda</Text>
      ) : (
        speakers.map((speaker, index) => (
          <SpeakInfo
            speaker={speaker}
            key={index}
            onDelete={() => handleDeleteSpeak(index)}
            canEdit={canEdit}
          />
        ))
      )}
      {canEdit && <SpeakerForm onSubmit={handleAddSpeak} />}
    </Flex>
  )
}

export default ScheduleEventForm
