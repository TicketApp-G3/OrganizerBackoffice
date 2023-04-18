import React from 'react'
import './CreateEventScreenStyles.css'
import { Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/Forms/EventForm/EventForm'

const CreateEventScreen = () => {
  const navigate = useNavigate()

  const onSubmit = async (errors, values, hasErrors) => {
    const { location, timeFrom, timeTo, capacity, status, ...data } = values

    const eventData = {
      timeFrom: timeFrom ? timeFrom.toISOString() : '',
      timeTo: timeTo ? timeTo.toISOString() : '',
      capacity: parseInt(capacity, 10),
      ...location,
      ...data,
    }

    if (hasErrors) {
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
