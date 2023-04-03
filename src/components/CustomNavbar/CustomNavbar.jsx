import React from 'react'
import './CustomNavbarStyles.css'
import { NavLink, Navbar, Text } from '@mantine/core'
import { useNavigate } from 'react-router'
import logo from '../../assets/logo.svg'

const CustomNavbar = ({ opened }) => {
  const navigate = useNavigate()

  const sections = {
    createEvent: {
      label: 'Crear Evento',
      path: 'createEvent',
    },
    myEvents: {
      label: 'Mis Eventos',
      path: 'myEvents',
    },
    metrics: {
      label: 'Métricas',
      path: 'metrics',
    },
  }
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <img src={logo} alt="logo" />

      {Object.values(sections).map(({ label, path }) => (
        <NavLink
          label={<Text>{label}</Text>}
          name={path}
          key={path}
          onClick={() => navigate(`/dashboard/${path}`)}
        />
      ))}
    </Navbar>
  )
}

export default CustomNavbar
