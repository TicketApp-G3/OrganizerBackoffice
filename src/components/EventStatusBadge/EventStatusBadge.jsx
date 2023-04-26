import React from 'react'
import { Badge } from '@mantine/core'

const eventStatus = {
  DRAFT: {
    label: 'BORRADOR',
    color: 'gray',
  },
  PUBLISHED: {
    label: 'PUBLICADO',
    color: 'blue',
  },
  CANCELED: {
    label: 'CANCELADO',
    color: 'red',
  },
  IN_PROGRESS: {
    label: 'EN CURSO',
    color: 'green',
  },
  COMPLETED: {
    label: 'FINALIZADO',
    color: 'red',
  },
}
const EventStatusBadge = ({ status }) => {
  return (
    <Badge color={eventStatus[status]?.color} variant="light">
      {eventStatus[status]?.label}
    </Badge>
  )
}

export default EventStatusBadge
