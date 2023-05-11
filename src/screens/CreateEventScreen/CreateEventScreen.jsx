import React, { useContext, useState } from 'react'
import './CreateEventScreenStyles.css'
import { Space, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/Forms/EventForm/EventForm'
import { AuthContext } from '../../contexts/AuthProvider'

const CreateEventScreen = () => {
  const navigate = useNavigate()
  const [submiting, setSubmiting] = useState(false)
  const { loggedUser } = useContext(AuthContext)

  const onSubmit = async (errors, values, hasErrors) => {
    if (hasErrors) {
      notifications.show({
        title: 'Complete los campos obligatorios',
        color: 'red',
      })
      return
    }

    const { location, timeFrom, timeTo, capacity, status, ...data } = values
    const eventData = {
      ownerId: loggedUser.userId,
      timeFrom: timeFrom ? timeFrom.toISOString() : '',
      timeTo: timeTo ? timeTo.toISOString() : '',
      capacity: parseInt(capacity, 10),
      ...location,
      ...data,
    }

    setSubmiting(true)
    apiProvider().createEvent({
      eventData,
      onSuccess: () => {
        notifications.show({
          title: 'Evento creado correctamente!',
          color: 'teal',
        })
        setSubmiting(false)
        setTimeout(() => navigate('/'), 1000)
      },
      onFailure: ({ statusText }) => {
        notifications.show({
          title: 'Error al crear el evento',
          message: statusText,
          color: 'red',
        })
        setSubmiting(false)
      },
    })
  }

  return (
    <>
      <Title>Creación de un evento</Title>
      <Space h={24} />
      <EventForm onSubmit={onSubmit} submiting={submiting} />
    </>
  )
}

export default CreateEventScreen
