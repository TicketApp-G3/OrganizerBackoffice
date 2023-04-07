import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'

import { Accordion, Box, Button } from '@mantine/core'
import BasicEventForm from '../../components/Forms/BasicEventForm'
import ScheduleEventForm from '../../components/Forms/ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../../components/Forms/FaqsEventForm/FaqsEventForm'

const CreateEventScreen = () => {
  const formState = useForm({
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
      schedule: [],
      faqs: [],
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formState.values)
  }

  return (
    <Box w={{ xs: '100%', md: '55%' }} className="formContainer">
      <Accordion defaultValue="information" transitionDuration={500}>
        <Accordion.Item value="information">
          <Accordion.Control>
            <b>Información del evento</b>
          </Accordion.Control>
          <Accordion.Panel>
            <BasicEventForm formState={formState} onSubmit={onSubmit} />
          </Accordion.Panel>
        </Accordion.Item>

        {formState.values.type === 'conference' && (
          <Accordion.Item value="conference">
            <Accordion.Control>
              <b>Agenda de la conferencia</b>
            </Accordion.Control>
            <Accordion.Panel>
              <ScheduleEventForm formState={formState} />
            </Accordion.Panel>
          </Accordion.Item>
        )}

        <Accordion.Item value="faqs">
          <Accordion.Control>
            <b>FAQs</b>
          </Accordion.Control>
          <Accordion.Panel>
            <FaqsEventForm formState={formState} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Button form="createEventForm" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default CreateEventScreen
