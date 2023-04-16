import React, { useEffect, useState } from 'react'
import './EditEventPageStyles.css'
import { useNavigate, useParams } from 'react-router'
import { notifications } from '@mantine/notifications'
import { Space, Title } from '@mantine/core'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/EventForm/EventForm'

const EditEventPage = () => {
  // const navigate = useNavigate()
  const [event, setEvent] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { eventId } = useParams()

  const getEvent = async () => {
    await apiProvider().getEventById({
      eventId,
      onSuccess: (data) => {
        const { latitude, longitude, address, date_time, ...restData } = data
        const formattedData = {
          ...restData,
          dateTime: new Date(date_time),
          location: {
            latitude,
            longitude,
            address,
          },
        }
        setEvent(formattedData)
        setIsLoading(false)
      },
    })
  }

  useEffect(() => {
    getEvent()
  }, [])

  const onSubmit = async (errors, values, isValid) => {
    // const { location, dateTime, capacity, ...data } = values
    // const eventData = {
    //   dateTime: dateTime ? dateTime.toISOString() : '',
    //   capacity: parseInt(capacity, 10),
    //   ...location,
    //   ...data,
    // }
    // if (isValid) {
    //   notifications.show({
    //     title: 'Complete los campos obligatorios',
    //     color: 'red',
    //   })
    // } else {
    //   await apiProvider().createEvent({
    //     eventData,
    //     onSuccess: () => {
    //       notifications.show({
    //         title: 'Evento creado correctamente!',
    //         color: 'teal',
    //       })
    //       setTimeout(() => navigate('/'), 1000)
    //     },
    //     onFailure: ({ statusText }) => {
    //       notifications.show({
    //         title: 'Error al crear el evento',
    //         message: statusText,
    //         color: 'red',
    //       })
    //     },
    //   })
    // }
  }

  return isLoading ? (
    <div>Cargando</div>
  ) : (
    <>
      <Title>Edición del evento: {event.title}</Title>
      <Space h={24} />
      <EventForm onSubmit={onSubmit} initialValues={event} />
    </>
  )
}

export default EditEventPage
