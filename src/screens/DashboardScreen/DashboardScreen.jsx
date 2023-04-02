import React, { useState } from 'react'
import './DashboardScreenStyles.css'
import { AppShell } from '@mantine/core'
import { Route, Routes } from 'react-router'
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import CreateEventScreen from '../CreateEventScreen/CreateEventScreen'
import MyEventsScreen from '../MyEventsScreen/MyEventsScreen'
import MetricsScreen from '../Metrics/MetricsScreen'

const DashboardScreen = () => {
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      layout="alt"
      navbar={<CustomNavbar opened={opened} />}
      header={<CustomHeader />}
    >
      <Routes>
        <Route path="createEvent" element={<CreateEventScreen />} />
        <Route path="myEvents" element={<MyEventsScreen />} />
        <Route path="metrics" element={<MetricsScreen />} />
      </Routes>
    </AppShell>
  )
}

export default DashboardScreen
