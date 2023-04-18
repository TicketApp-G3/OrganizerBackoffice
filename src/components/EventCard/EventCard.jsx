import { Badge, Box, Card, Group, Image, Text } from '@mantine/core'
import React from 'react'
import { dateFormatter } from '../../utils/formatters'
import './EventCardStyles.css'
import EventStatusBadge from '../EventStatusBadge/EventStatusBadge'

const EventCard = ({ event }) => {
  const { images, title, address, date, type, id, status } = event

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={id}
      component="a"
      href={`/event/${id}`}
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
          <Text weight="bold">{dateFormatter(date)}</Text>
        </Group>

        <Text>{address}</Text>

        <Group position="apart" mt="md" mb="xs">
          <Badge color="gray" variant="light">
            {type}
          </Badge>

          <EventStatusBadge status={status} />
        </Group>
      </Box>
    </Card>
  )
}

export default EventCard
