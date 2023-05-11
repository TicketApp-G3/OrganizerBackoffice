import React, { useContext, useEffect, useState } from 'react'
import './MyEventsScreenStyles.css'
import { SimpleGrid, Space, Text, Title } from '@mantine/core'
import apiProvider from '../../api/apiProvider'
import EventCard from '../../components/EventCard/EventCard'
import { AuthContext } from '../../contexts/AuthProvider'

const MyEventsScreen = () => {
  const [events, setEvents] = useState([])
  const { loggedUser } = useContext(AuthContext)

  useEffect(() => {
    apiProvider().getMyEvents({
      userId: loggedUser.userId,
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
        {!events.length ? (
          <Text>No tienes eventos todavía</Text>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </SimpleGrid>
    </>
  )
}

export default MyEventsScreen
