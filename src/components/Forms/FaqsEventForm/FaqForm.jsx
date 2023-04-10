import { Button, Flex, Group, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import FaqInfo from './FaqInfo'

const FaqForm = ({ onSubmit }) => {
  const [submited, setSubmited] = useState(false)
  const theme = useMantineTheme()

  const formState = useForm({
    initialValues: {
      question: '',
      answer: '',
    },
  })

  const handleSubmit = (values) => {
    setSubmited(true)
    onSubmit(values)
  }

  return (
    <form onSubmit={formState.onSubmit(handleSubmit)}>
      {submited ? (
        <FaqInfo data={formState.values} />
      ) : (
        <Flex
          direction="column"
          gap={10}
          className="formContainer"
          style={{ borderColor: theme.colors.gray[5] }}
        >
          <TextInput
            label="Pregunta"
            readOnly={submited}
            {...formState.getInputProps('question')}
          />
          <TextInput
            label="Respuesta"
            readOnly={submited}
            {...formState.getInputProps('answer')}
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

export default FaqForm
