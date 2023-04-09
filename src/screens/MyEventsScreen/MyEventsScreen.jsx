import React, { useEffect, useState } from 'react'
import './MyEventsScreenStyles.css'
import { SimpleGrid, Space, Title } from '@mantine/core'
import apiProvider from '../../api/apiProvider'
import EventCard from '../../components/EventCard/EventCard'

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
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default MyEventsScreen
