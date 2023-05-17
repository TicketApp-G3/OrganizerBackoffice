import React, { useEffect, useState } from 'react'
import './EditEventPageStyles.css'
import { useNavigate, useParams } from 'react-router'
import { notifications } from '@mantine/notifications'
import { Space, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import apiProvider from '../../api/apiProvider'
import EventForm from '../../components/Forms/EventForm/EventForm'

const EditEventPage = () => {
  const navigate = useNavigate()
  const [event, setEvent] = useState({})
  const [isLoading, setIsLoading] = useState(true)
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
      createdAt,
      ownerId,
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
      ...(status === 'DRAFT' && { ...data }),
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

  const handleConfirmChanges = (errors, values, hasErrors) => {
    if (values.status === 'PUBLISHED') {
      modals.openConfirmModal({
        title: 'Confirmación de cambios',
        children: (
          <Text size="sm">
            Estos cambios serán notificados a los usuarios. ¿Estás seguro de que
            quieres realizarlos?
          </Text>
        ),
        labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
        onConfirm: () => {
          onSubmit(errors, values, hasErrors)
        },
      })
    } else {
      onSubmit(errors, values, hasErrors)
    }
  }

  return isLoading ? (
    <div>Cargando</div>
  ) : (
    <>
      <Title>Edición del evento: {event.title}</Title>
      <Space h={24} />
      <EventForm onSubmit={handleConfirmChanges} initialValues={event} />
    </>
  )
}

export default EditEventPage
