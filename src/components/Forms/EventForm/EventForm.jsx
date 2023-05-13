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
  DRAFT: 'DRAFT',
  SUSPENDRAFT: 'SUSPENDRAFT',
  PUBLISHED: 'PUBLISHED',
  CANCELED: 'CANCELED',
}

const EventForm = ({ initialValues, onSubmit, submiting }) => {
  const [changingStatus, setChangingStatus] = useState(false)
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

  const [currentStatus, setCurrentStatus] = useState(
    initialValues?.status || EVENT_STATUSES.DRAFT
  )

  const isDraft = currentStatus === 'DRAFT'
  const isPublished = currentStatus === 'PUBLISHED'
  const isSuspenDraft = currentStatus === 'SUSPENDRAFT'

  const [canChangeStatus, setCanChangeStatus] = useState(
    isDraft || isPublished || isSuspenDraft
  )

  const publishEvent = () => {
    setChangingStatus(true)
    apiProvider().publishEvent({
      eventId: initialValues.id,
      onSuccess: () => {
        setCurrentStatus(EVENT_STATUSES.PUBLISHED)
        notifications.show({
          title: '¡Exito!',
          message: 'El evento fue publicado!',
          color: 'teal',
        })
        setCanChangeStatus(true)
      },
    })
    setChangingStatus(false)
  }

  const cancelEvent = () => {
    setChangingStatus(true)
    apiProvider().cancelEvent({
      eventId: initialValues.id,
      onSuccess: () => {
        setCurrentStatus(EVENT_STATUSES.CANCELED)
        notifications.show({
          title: '¡Exito!',
          message: 'El evento fue cancelado!',
          color: 'teal',
        })
        setCanChangeStatus(false)
      },
    })
    setChangingStatus(false)
  }

  const submitButtonStatus = {
    DRAFT: {
      buttonLabel: 'Publicar evento',
      onClick: publishEvent,
    },
    SUSPENDRAFT: {
      buttonLabel: 'Re-Publicar evento',
      onClick: publishEvent,
    },
    PUBLISHED: {
      buttonLabel: 'Cancelar evento',
      onClick: cancelEvent,
    },
  }

  const sections = [
    {
      value: 'information',
      title: 'Información del evento',
      Form: (
        <BasicEventForm
          formState={formState}
          onSubmit={onSubmit}
          isDraft={isDraft}
          isPublished={isPublished}
        />
      ),
    },
    {
      value: 'schedule',
      title: 'Agenda',
      Form: <ScheduleEventForm formState={formState} isDraft={isDraft} />,
    },
    {
      value: 'faqs',
      title: 'FAQs',
      Form: (
        <FaqsEventForm
          formState={formState}
          isDraft={isDraft}
          isPublished={isPublished}
        />
      ),
    },
  ]

  const buttonText = initialValues
    ? !isDraft && !isPublished
      ? 'Ya no se pueden realizar cambios'
      : 'Guardar cambios '
    : 'Crear evento'

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
          <Button
            fullWidth
            variant="outline"
            onClick={submitButtonStatus[currentStatus]?.onClick}
            loading={changingStatus}
          >
            {submitButtonStatus[currentStatus]?.buttonLabel}
          </Button>
        )}
        {(isDraft || isPublished) && (
          <Button
            fullWidth
            form="createEventForm"
            type="submit"
            loading={submiting}
          >
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default EventForm
