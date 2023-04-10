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
import { TimeInput } from '@mantine/dates'
import SpeakInfo from './SpeakInfo'

const SpeakerForm = ({ onSubmit }) => {
  const [submited, setSubmited] = useState(false)
  const theme = useMantineTheme()

  const formState = useForm({
    initialValues: {
      presenter: '',
      title: '',
      description: '',
      image: '',
      timeFrom: '',
      timeTo: '',
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
          className="formContainer"
          style={{ borderColor: theme.colors.gray[5] }}
        >
          <TextInput
            label="Nombre"
            readOnly={submited}
            {...formState.getInputProps('presenter')}
          />
          <TextInput
            label="Título"
            readOnly={submited}
            {...formState.getInputProps('title')}
          />
          <Textarea
            label="Descripción"
            readOnly={submited}
            {...formState.getInputProps('description')}
          />
          <TimeInput
            label="Hora de inicio"
            locale="es"
            size="sm"
            {...formState.getInputProps('timeFrom')}
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
