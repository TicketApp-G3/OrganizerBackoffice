import React from 'react'
import './EventFormStyles.css'
import { Accordion, Box, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import BasicEventForm from '../Forms/BasicEventForm'
import ScheduleEventForm from '../Forms/ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../Forms/FaqsEventForm/FaqsEventForm'
import {
  capacityValidation,
  locationValidation,
  requiredField,
} from './formValidations'

const DEFAULT_FORM_VALUES = {
  title: '',
  type: '',
  dateTime: '',
  description: '',
  capacity: 0,
  location: {
    address: '',
    latitude: '',
    longitude: '',
  },
  status: 'DRAFT',
  images: [],
  schedule: [],
  faqs: [],
}

const EventForm = ({ initialValues, onSubmit }) => {
  const formState = useForm({
    initialValues: initialValues || DEFAULT_FORM_VALUES,
    validate: {
      title: requiredField,
      dateTime: requiredField,
      type: requiredField,
      location: locationValidation,
      capacity: capacityValidation,
    },
  })

  const sections = [
    {
      value: 'information',
      title: 'Información del evento',
      Form: <BasicEventForm formState={formState} onSubmit={onSubmit} />,
    },
    {
      value: 'schedule',
      title: 'Agenda',
      Form: <ScheduleEventForm formState={formState} />,
    },
    {
      value: 'faqs',
      title: 'FAQs',
      Form: <FaqsEventForm formState={formState} />,
    },
  ]

  return (
    <Box w={{ md: 700 }} className="createEventContainer">
      <Accordion defaultValue="information" transitionDuration={500}>
        {sections.map(({ value, title, Form }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Control>
              <b>{title}</b>
            </Accordion.Control>
            <Accordion.Panel>{Form}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      <Button form="createEventForm" type="submit">
        Crear evento
      </Button>
    </Box>
  )
}

export default EventForm
