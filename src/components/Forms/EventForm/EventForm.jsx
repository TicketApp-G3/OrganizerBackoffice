import React, { useState } from 'react'
import './EventFormStyles.css'
import { Accordion, Box, Button, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import BasicEventForm from '../BasicEventForm'
import ScheduleEventForm from '../ScheduleEventForm/ScheduleEventForm'
import FaqsEventForm from '../FaqsEventForm/FaqsEventForm'
import {
  capacityValidation,
  locationValidation,
  requiredField,
} from './formValidations'

const DEFAULT_FORM_VALUES = {
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
  images: [],
  schedule: [],
  faqs: [],
}

const EVENT_STATUSES = {
  DRAFT: {
    label: 'Publicar evento',
    nextStatus: 'IN_PROGRESS',
  },
  IN_PROGRESS: {
    label: 'Finalizar',
    nextStatus: 'FINISHED',
  },
}

const EventForm = ({ initialValues, onSubmit }) => {
  const formState = useForm({
    initialValues: initialValues || DEFAULT_FORM_VALUES,
    validate: {
      title: requiredField,
      dateTime: requiredField,
      type: requiredField,
      location: locationValidation,
      capacity: capacityValidation,
    },
  })
  const [currentStatus, setCurrentStatus] = useState(initialValues.status)
  const [isFinished, setIsFinished] = useState(
    initialValues.status === 'FINISHED'
  )

  const changeEventStatus = () => {
    const { nextStatus } = EVENT_STATUSES[currentStatus]
    setCurrentStatus(nextStatus)
    if (nextStatus === 'FINISHED') setIsFinished(true)
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
        {initialValues && !isFinished && (
          <Button
            fullWidth
            variant="outline"
            onClick={() =>
              changeEventStatus(EVENT_STATUSES[currentStatus].nextStatus)
            }
          >
            {EVENT_STATUSES[currentStatus].label}
          </Button>
        )}
        <Button
          disabled={isFinished}
          fullWidth
          form="createEventForm"
          type="submit"
        >
          {initialValues
            ? isFinished
              ? 'Evento Finalizado'
              : 'Guardar cambios '
            : 'Crear evento'}
        </Button>
      </Flex>
    </Box>
  )
}

export default EventForm
