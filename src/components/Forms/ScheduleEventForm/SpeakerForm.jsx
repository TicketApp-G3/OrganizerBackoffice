import React from 'react'
import {
  Button,
  Flex,
  Group,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { TimeInput } from '@mantine/dates'

const SpeakerForm = ({ onSubmit }) => {
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

  return (
    <form onSubmit={formState.onSubmit(onSubmit)}>
      <Flex
        direction="column"
        gap={10}
        className="formContainer"
        style={{ borderColor: theme.colors.gray[5] }}
      >
        <TextInput label="Nombre" {...formState.getInputProps('presenter')} />
        <TextInput label="Título" {...formState.getInputProps('title')} />
        <Textarea
          label="Descripción"
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
    </form>
  )
}

export default SpeakerForm
