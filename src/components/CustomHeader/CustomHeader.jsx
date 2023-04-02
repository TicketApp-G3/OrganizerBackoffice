import React from 'react'
import './CustomHeaderStyles.css'
import { Burger, Header, MediaQuery, Text } from '@mantine/core'

const CustomHeader = ({ opened, setOpened }) => {
  const handleOpen = () => {
    setOpened((open) => !open)
  }

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={handleOpen} size="sm" mr="xl" />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Header>
  )
}

export default CustomHeader
