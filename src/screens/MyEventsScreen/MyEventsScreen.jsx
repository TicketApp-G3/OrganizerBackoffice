import React, { useEffect, useState } from 'react'
import './MyEventsScreenStyles.css'
import {
  Badge,
  Card,
  Group,
  Image,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core'
import { dateFormatter } from '../../utils/formatters'
import apiProvider from '../../api/apiProvider'

const MyEventsScreen = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    apiProvider().getMyEvents({
      userId: 1,
      onSuccess: (response) => setEvents(response),
      onFailure: (response) => console.log(response),
    })
  }, [])

  return (
    <>
      <Title>Mis Eventos</Title>
      <Space h={24} />
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 'lg', cols: 3, spacing: 'lg' },
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' },
        ]}
      >
        {events.map(({ images, title, address, date, type, status, id }) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={id}
            component="a"
            href={`/dashboard/myEvents/event/${id}`}
          >
            <Card.Section>
              <Image src={images[0]} height={160} alt="Norway" />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight="bold">{title}</Text>
              <Text weight="bold">{dateFormatter(date)}</Text>
            </Group>
            <Text>{address}</Text>
            <Group position="apart" mt="md" mb="xs">
              <Badge color="pink" variant="light">
                {type}
              </Badge>
              <Badge color="pink" variant="light">
                {status}
              </Badge>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}

export default MyEventsScreen
