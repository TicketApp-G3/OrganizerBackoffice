import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Accordion, Box, Button, Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import BasicEventForm from '../../components/Forms/BasicEventForm'
import ScheduleEventForm from '../../components/Forms/ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../../components/Forms/FaqsEventForm/FaqsEventForm'
import apiProvider from '../../api/apiProvider'
import {
  capacityValidation,
  locationValidation,
  requiredField,
} from './formValidations'

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
    validate: {
      title: requiredField,
      dateTime: requiredField,
      type: requiredField,
      location: locationValidation,
      capacity: capacityValidation,
    },
  })

  const onSubmit = async (errors, values) => {
    const { location, dateTime, capacity, ...data } = values
    const eventData = {
      dateTime: dateTime ? dateTime.toISOString() : '',
      capacity: parseInt(capacity, 10),
      ...location,
      ...data,
    }

    if (formState.isValid) {
      notifications.show({
        title: 'Complete los campos obligatorios',
        color: 'red',
      })
    } else {
      await apiProvider().createEvent({
        eventData,

        onSuccess: () => {
          notifications.show({
            title: 'Evento creado correctamente!',
            color: 'teal',
          })
          setTimeout(() => navigate('/'), 1000)
        },

        onFailure: ({ statusText }) => {
          notifications.show({
            title: 'Error al crear el evento',
            message: statusText,
            color: 'red',
          })
        },
      })
    }
  }

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
              <Accordion.Panel>{Form}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Button form="createEventForm" type="submit">
          Crear evento
        </Button>
      </Box>
    </>
  )
}

export default CreateEventScreen
