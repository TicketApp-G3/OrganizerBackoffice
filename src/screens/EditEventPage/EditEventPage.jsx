import React, { useEffect, useState } from 'react'
import './EditEventPageStyles.css'
import { useNavigate, useParams } from 'react-router'
import { notifications } from '@mantine/notifications'
import { Space, Title } from '@mantine/core'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/Forms/EventForm/EventForm'

const EditEventPage = () => {
  const navigate = useNavigate()
  const [event, setEvent] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [canEdit, setCanEdit] = useState(true)
  const { eventId } = useParams()

  const getEvent = async () => {
    await apiProvider().getEventById({
      eventId,
      onSuccess: (data) => {
        const {
          latitude,
          longitude,
          address,
          timeFrom,
          timeTo,
          status,
          ...restData
        } = data
        const formattedData = {
          ...restData,
          timeFrom: new Date(timeFrom),
          timeTo: new Date(timeTo),
          location: {
            latitude,
            longitude,
            address,
          },
          status,
        }
        setCanEdit(status === 'DRAFT')
        setEvent(formattedData)
        setIsLoading(false)
      },
    })
  }

  useEffect(() => {
    getEvent()
  }, [])

  const onSubmit = async (errors, values, hasErrors) => {
    if (hasErrors) {
      notifications.show({
        title: 'Complete los campos obligatorios',
        color: 'red',
      })
      return
    }

    const {
      location,
      timeFrom,
      timeTo,
      capacity,
      status,
      description,
      id,
      count,
      faqs,
      images,
      ...data
    } = values

    const eventData = {
      timeFrom: timeFrom ? timeFrom.toISOString() : '',
      timeTo: timeTo ? timeTo.toISOString() : '',
      capacity: parseInt(capacity, 10),
      description,
      images,
      faqs,
      ...location,
      ...(canEdit && { ...data }),
    }

    apiProvider().editEvent({
      eventId: id,
      eventData,
      onSuccess: () => {
        notifications.show({
          title: 'Evento editado correctamente!',
          color: 'teal',
        })
        setTimeout(() => navigate('/'), 1000)
      },
      onFailure: ({ statusText }) => {
        notifications.show({
          title: 'Error al editar el evento',
          message: statusText,
          color: 'red',
        })
      },
    })
  }

  return isLoading ? (
    <div>Cargando</div>
  ) : (
    <>
      <Title>Edición del evento: {event.title}</Title>
      <Space h={24} />
      <EventForm onSubmit={onSubmit} initialValues={event} canEdit={canEdit} />
    </>
  )
}

export default EditEventPage
