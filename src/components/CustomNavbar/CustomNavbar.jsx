import React from 'react'
import './CustomNavbarStyles.css'
import { NavLink, Navbar, Text } from '@mantine/core'
import { useNavigate, useParams } from 'react-router'
import {
  IconChevronRight,
  IconSquarePlus,
  IconTicket,
  IconChartInfographic,
} from '@tabler/icons-react'

const CustomNavbar = ({ opened }) => {
  const navigate = useNavigate()
  const { '*': activeSection } = useParams()

  const sections = {
    createEvent: {
      label: 'Crear Evento',
      path: 'createEvent',
      icon: IconSquarePlus,
    },
    myEvents: {
      label: 'Mis Eventos',
      path: 'myEvents',
      icon: IconTicket,
    },
    metrics: {
      label: 'Métricas',
      path: 'metrics',
      icon: IconChartInfographic,
    },
  }

  const handleSelect = (path) => {
    navigate(`/dashboard/${path}`)
  }

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 250, lg: 300 }}
      style={{ gap: 4 }}
    >
      {Object.values(sections).map(({ label, path, icon: Icon }) => (
        <NavLink
          label={<Text size="md">{label}</Text>}
          name={path}
          key={path}
          icon={<Icon />}
          rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
          variant="light"
          h={50}
          active={activeSection === path}
          onClick={() => handleSelect(path)}
        />
      ))}
    </Navbar>
  )
}

export default CustomNavbar
