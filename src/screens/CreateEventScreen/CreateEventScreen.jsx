import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Button, Group, Select, TextInput } from '@mantine/core'
import CustomRichTextEditor from '../../components/CustomRichTextEditor/CustomRichTextEditor'

const CreateEventScreen = () => {
  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      startDate: '',
      description: '',
    },
  })

  console.log(form.values)

  return (
    <div className="container">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Título"
          placeholder="Ingrese el título del evento"
          {...form.getInputProps('title')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}

export default CreateEventScreen
