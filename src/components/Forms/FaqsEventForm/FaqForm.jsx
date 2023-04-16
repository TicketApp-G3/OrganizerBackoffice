import React from 'react'
import { Button, Flex, Group, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'

const FaqForm = ({ onSubmit }) => {
  const theme = useMantineTheme()

  const formState = useForm({
    initialValues: {
      question: '',
      answer: '',
    },
  })

  const handleSubmit = (values) => {
    formState.reset()
    onSubmit(values)
  }

  return (
    <form onSubmit={formState.onSubmit(handleSubmit)}>
      <Flex
        direction="column"
        gap={10}
        className="formContainer"
        style={{ borderColor: theme.colors.gray[5] }}
      >
        <TextInput label="Pregunta" {...formState.getInputProps('question')} />
        <TextInput label="Respuesta" {...formState.getInputProps('answer')} />
        <Group position="right" mt="md">
          <Button variant="outline" type="submit">
            Agregar
          </Button>
        </Group>
      </Flex>
    </form>
  )
}

export default FaqForm
