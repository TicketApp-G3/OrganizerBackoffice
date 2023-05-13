import React from 'react'
import { Badge } from '@mantine/core'

const statuses = {
  DRAFT: {
    label: 'BORRADOR',
    color: 'gray',
    variant: 'light',
  },
  PUBLISHED: {
    label: 'PUBLICADO',
    color: 'blue',
    variant: 'light',
  },
  CANCELLED: {
    label: 'CANCELADO',
    color: 'red',
    variant: 'light',
  },
  IN_PROGRESS: {
    label: 'EN CURSO',
    color: 'green',
    variant: 'light',
  },
  COMPLETED: {
    label: 'FINALIZADO',
    color: 'red',
    variant: 'light',
  },
  SUSPENDRAFT: {
    label: 'DESBLOQUEADO',
    color: 'orange',
    variant: 'light',
  },
  SUSPENDED: {
    label: 'BLOQUEADO',
    color: 'red',
    variant: 'filled',
  },
  BLOCKED: {
    label: 'BLOQUEADO',
    color: 'red',
    variant: 'outline',
  },
  ACTIVE: {
    label: 'ACTIVO',
    color: 'teal',
    variant: 'outline',
  },
}
const EventStatusBadge = ({ status }) => {
  return (
    <Badge
      color={statuses[status]?.color}
      miw={100}
      variant={statuses[status]?.variant}
    >
      {statuses[status]?.label}
    </Badge>
  )
}

export default EventStatusBadge
