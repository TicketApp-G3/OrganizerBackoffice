import {
  Button,
  Flex,
  Group,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import SpeakInfo from './SpeakInfo'

const SpeakerForm = ({ onSubmit }) => {
  const [submited, setSubmited] = useState(false)
  const theme = useMantineTheme()

  const formState = useForm({
    initialValues: {
      speaker: '',
      speakTitle: '',
      speakDescription: '',
      image: '',
      startTime: '',
      endTime: '',
    },
  })

  const handleSubmit = (values) => {
    setSubmited(true)
    onSubmit(values)
  }

  return (
    <form onSubmit={formState.onSubmit(handleSubmit)}>
      {submited ? (
        <SpeakInfo data={formState.values} />
      ) : (
        <Flex
          direction="column"
          gap={10}
          className="speakFormContainer"
          style={{ borderColor: theme.colors.gray[5] }}
        >
          <TextInput
            label="Nombre del orador"
            readOnly={submited}
            {...formState.getInputProps('speaker')}
          />
          <TextInput
            label="Título de la charla"
            readOnly={submited}
            {...formState.getInputProps('speakTitle')}
          />
          <Textarea
            label="Descripción de la charla"
            readOnly={submited}
            {...formState.getInputProps('speakDescription')}
          />
          <Group position="right" mt="md">
            <Button variant="outline" type="submit">
              Agregar
            </Button>
          </Group>
        </Flex>
      )}
    </form>
  )
}

export default SpeakerForm
