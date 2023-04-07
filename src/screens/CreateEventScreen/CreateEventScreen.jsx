import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Button, Flex, Group, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import Dropzone from 'react-dropzone'
import CustomRichTextEditor from '../../components/CustomRichTextEditor/CustomRichTextEditor'
import PlacesSearchBox from '../../components/PlacesSearchBox/PlacesSearchBox'
import CustomDropzone from '../../components/CustomDropzone/CustomDropzone'
import BasicEventForm from '../../components/Forms/BasicEventForm'

const CreateEventScreen = () => {
  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      date: '',
      description: '',
      capacity: '',
      location: {
        address: '',
        lat: '',
        long: '',
      },
      status: 'draft',
      images: [],
    },
  })

  const onSubmit = () => {
    form.onSubmit((values) => console.log(values))
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="formContainer">
        <BasicEventForm formState={form} />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}

export default CreateEventScreen
