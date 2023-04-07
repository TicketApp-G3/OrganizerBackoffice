import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'

import { Accordion, Box, Button } from '@mantine/core'
import BasicEventForm from '../../components/Forms/BasicEventForm'
import ScheduleEventForm from '../../components/Forms/ScheduleEventForm/ScheduleEventForm'

const CreateEventScreen = () => {
  const basicFormState = useForm({
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

  const scheduleFormState = useForm({})

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(basicFormState.values)
  }

  return (
    <Box w={{ xs: '100%', md: '55%' }} className="formContainer">
      <Accordion defaultValue="information" transitionDuration={500}>
        <Accordion.Item value="information">
          <Accordion.Control>
            <b>Información del evento</b>
          </Accordion.Control>
          <Accordion.Panel>
            <BasicEventForm formState={basicFormState} onSubmit={onSubmit} />
          </Accordion.Panel>
        </Accordion.Item>

        {basicFormState.values.type === 'conference' && (
          <Accordion.Item value="conference">
            <Accordion.Control>
              <b>Agenda de la conferencia</b>
            </Accordion.Control>
            <Accordion.Panel>
              <ScheduleEventForm formState={scheduleFormState} />
            </Accordion.Panel>
          </Accordion.Item>
        )}

        <Accordion.Item value="faqs">
          <Accordion.Control>
            <b>FAQs</b>
          </Accordion.Control>
          <Accordion.Panel>Acá van las Faqs</Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Button form="createEventForm" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default CreateEventScreen
