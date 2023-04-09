import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'

import { Accordion, Box, Button, Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import BasicEventForm from '../../components/Forms/BasicEventForm'
import ScheduleEventForm from '../../components/Forms/ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../../components/Forms/FaqsEventForm/FaqsEventForm'
import apiProvider from '../../api/bffService'

const CreateEventScreen = () => {
  const navigate = useNavigate()

  const formState = useForm({
    initialValues: {
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
      status: 'draft',
      images: [],
      schedule: [],
      faqs: [],
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const { location, dateTime, capacity, ...data } = formState.values
    const eventData = {
      dateTime: dateTime.toISOString(),
      capacity: parseInt(capacity, 10),
      ...location,
      ...data,
    }
    await apiProvider().createEvent({
      eventData,
      onSuccess: () => navigate('/'),
    })
  }

  const sections = [
    {
      value: 'information',
      title: 'Información del evento',
      Form: BasicEventForm,
    },
    {
      value: 'schedule',
      title: 'Agenda',
      Form: ScheduleEventForm,
    },
    {
      value: 'faqs',
      title: 'FAQs',
      Form: FaqsEventForm,
    },
  ]

  return (
    <>
      <Title>Creación de un evento</Title>
      <Space h={24} />
      <Box w={{ md: 700 }} className="createEventContainer">
        <Accordion defaultValue="information" transitionDuration={500}>
          {sections.map(({ value, title, Form }) => (
            <Accordion.Item value={value} key={value}>
              <Accordion.Control>
                <b>{title}</b>
              </Accordion.Control>
              <Accordion.Panel>
                <Form formState={formState} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Button form="createEventForm" type="submit" onClick={onSubmit}>
          Crear evento
        </Button>
      </Box>
    </>
  )
}

export default CreateEventScreen
