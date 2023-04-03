import React from 'react'
import './CustomHeaderStyles.css'
import { Burger, Header, MediaQuery, Text } from '@mantine/core'
import SwitchThemeButton from '../SwitchThemeButton/SwitchThemeButton'

const CustomHeader = ({ opened, handleBurguerOpened }) => {
  return (
    <Header height={50} className="headerContainer">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: 20,
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={handleBurguerOpened} size="sm" />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
      <SwitchThemeButton />
    </Header>
  )
}

export default CustomHeader
