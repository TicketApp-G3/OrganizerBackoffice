import React, { useState } from 'react'
import './EventFormStyles.css'
import { Accordion, Box, Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import BasicEventForm from '../BasicEventForm'
import ScheduleEventForm from '../ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../FaqsEventForm/FaqsEventForm'
import {
  capacityValidation,
  locationValidation,
  requiredField,
} from './formValidations'
import apiProvider from '../../../api/apiProvider'

const DEFAULT_FORM_VALUES = {
  title: '',
  type: '',
  timeFrom: '',
  timeTo: '',
  description: '',
  capacity: 0,
  location: {
    address: '',
    latitude: '',
    longitude: '',
  },
  images: [],
  schedule: [],
  faqs: [],
}

const EVENT_STATUSES = {
  DRAFT: {
    label: 'Publicar evento',
    nextStatus: 'PUBLISHED',
  },
  PUBLISHED: {
    label: 'Cancelar evento',
    nextStatus: 'CANCELED',
  },
}

const EventForm = ({ initialValues, onSubmit }) => {
  const formState = useForm({
    initialValues: initialValues || DEFAULT_FORM_VALUES,
    validate: {
      title: requiredField,
      timeFrom: requiredField,
      timeTo: requiredField,
      type: requiredField,
      location: locationValidation,
      capacity: capacityValidation,
    },
  })
  const [currentStatus, setCurrentStatus] = useState(initialValues?.status)
  const [canChangeStatus, setCanChangeStatus] = useState(
    currentStatus === 'DRAFT' || currentStatus === 'PUBLISHED'
  )

  const changeEventStatus = () => {
    const { nextStatus } = EVENT_STATUSES[currentStatus]
    apiProvider().publishEvent({
      eventId: initialValues.id,
      onSuccess: () => {
        setCurrentStatus(nextStatus)
        notifications.show({
          title: 'Error al editar el evento',
          message: 'El evento fue publicado!',
          color: 'teal',
        })
        setCanChangeStatus(
          currentStatus === 'DRAFT' || currentStatus === 'PUBLISHED'
        )
      },
    })
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

      <Flex gap={20}>
        {initialValues && canChangeStatus && (
          <Button fullWidth variant="outline" onClick={changeEventStatus}>
            {EVENT_STATUSES[currentStatus]?.label}
          </Button>
        )}
        <Button
          disabled={!canChangeStatus}
          fullWidth
          form="createEventForm"
          type="submit"
        >
          {initialValues
            ? !canChangeStatus
              ? 'Ya no se pueden realizar cambios'
              : 'Guardar cambios '
            : 'Crear evento'}
        </Button>
      </Flex>
    </Box>
  )
}

export default EventForm
