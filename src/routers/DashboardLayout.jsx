import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import { AppShell, useMantineTheme } from '@mantine/core'
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen'
import CustomNavbar from '../components/CustomNavbar/CustomNavbar'
import CustomHeader from '../components/CustomHeader/CustomHeader'
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen'
import MyEventsScreen from '../screens/MyEventsScreen/MyEventsScreen'
import MetricsScreen from '../screens/Metrics/MetricsScreen'
import EditEventPage from '../screens/EditEventPage/EditEventPage'

const DashboardLayout = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const theme = useMantineTheme()

  const toggleOpenNavbarStatus = () => {
    setOpenNavbar(!openNavbar)
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<CustomNavbar opened={openNavbar} />}
      header={
        <CustomHeader
          opened={openNavbar}
          handleBurguerOpened={toggleOpenNavbarStatus}
        />
      }
      styles={{
        main: {
          width: 'unset',
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
    >
      <Routes>
        <Route path="createEvent" element={<CreateEventScreen />} />
        <Route path="myEvents" element={<MyEventsScreen />} />
        <Route path="metrics" element={<MetricsScreen />} />
        <Route path="event/:eventId" element={<EditEventPage />} />
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </AppShell>
  )
}

export default DashboardLayout
