import React from 'react'
import './CreateEventScreenStyles.css'
import { Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/EventForm/EventForm'

const CreateEventScreen = () => {
  const navigate = useNavigate()

  const onSubmit = async (errors, values, isValid) => {
    console.log(errors, values, isValid)
    const { location, dateTime, capacity, ...data } = values

    const eventData = {
      dateTime: dateTime ? dateTime.toISOString() : '',
      capacity: parseInt(capacity, 10),
      ...location,
      ...data,
    }

    if (isValid) {
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
      <EventForm onSubmit={onSubmit} />
    </>
  )
}

export default CreateEventScreen
