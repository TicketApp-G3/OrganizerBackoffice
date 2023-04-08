import React from 'react'
import { Burger, Flex, Header, MediaQuery, Text } from '@mantine/core'
import SwitchThemeButton from '../SwitchThemeButton/SwitchThemeButton'
import './CustomHeaderStyles.css'
import logo from '../../assets/logo.svg'

const CustomHeader = ({ opened, handleBurguerOpened }) => {
  return (
    <Header height={55} className="headerContainer">
      <Flex align="center" h="100%" gap={20}>
        <a href="/">
          <img src={logo} alt="logo" width={90} />
        </a>

        <Text fw="bold" size={20}>
          Backoffice
        </Text>

        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={handleBurguerOpened} size="sm" />
        </MediaQuery>
      </Flex>
      <SwitchThemeButton />
    </Header>
  )
}

export default CustomHeader
