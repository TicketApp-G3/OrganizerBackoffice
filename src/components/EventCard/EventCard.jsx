import { Box, Card, Group, Image, Text } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router'
import { dateFormatter } from '../../utils/formatters'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'
import './EventCardStyles.css'
import EventTypeBadge from '../EventTypeBadge/EventTypeBadge'

const EventCard = ({ event }) => {
  const { images, title, address, timeFrom, type, id, status } = event
  const navigate = useNavigate()

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={id}
      component="a"
      onClick={() => navigate(`/dashboard/myEvents/event/${id}`)}
      className="cardContainer"
    >
      <Card.Section>
        <Image
          src={images[0] || 'https://uzex.uz/images/blog/image_not_found.png'}
          height={160}
          alt="EventImage"
        />
      </Card.Section>

      <Box className="cardContent">
        <Group position="apart" mt="md" mb="xs">
          <Text weight="bold">{title}</Text>
          <Text weight="bold">{dateFormatter(timeFrom)}</Text>
        </Group>

        <Text>{address}</Text>

        <Group position="apart" mt="md" mb="xs">
          <EventTypeBadge type={type} />
          <EventStatusBadge status={status} />
        </Group>
      </Box>
    </Card>
  )
}

export default EventCard
