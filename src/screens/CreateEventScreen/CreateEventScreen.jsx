import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import apiProvider from '../../api/apiProvider'
import {
  capacityValidation,
  locationValidation,
  requiredField,
} from './formValidations'
import EventForm from '../../components/EventForm/EventForm'

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

  return (
    <>
      <Title>Creación de un evento</Title>
      <Space h={24} />
      <EventForm formState={formState} onSubmit={onSubmit} />
    </>
  )
}

export default CreateEventScreen
