import React from 'react'
import { Badge } from '@mantine/core'

const eventStatus = {
  CONFERENCE: {
    label: 'CONFERENCIA',
  },
  CONCERT: {
    label: 'CONCIERTO',
  },
  DISCOTEC: {
    label: 'BOLICHE',
  },
  STAND_UP: {
    label: 'STAND UP',
  },
}
const EventTypeBadge = ({ type }) => {
  return (
    <Badge color="gray" variant="light">
      {eventStatus[type]?.label}
    </Badge>
  )
}

export default EventTypeBadge
