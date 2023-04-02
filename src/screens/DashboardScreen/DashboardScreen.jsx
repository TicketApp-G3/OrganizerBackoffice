import React, { useEffect, useState } from 'react'
import './DashboardScreenStyles.css'
import { AppShell } from '@mantine/core'
import { Route, Routes } from 'react-router'
import { useMediaQuery } from '@mantine/hooks'
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import CreateEventScreen from '../CreateEventScreen/CreateEventScreen'
import MyEventsScreen from '../MyEventsScreen/MyEventsScreen'
import MetricsScreen from '../Metrics/MetricsScreen'

const DashboardScreen = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const mobileScreen = useMediaQuery('(max-width: 48em)')
  const [layout, setLayout] = useState('default')

  useEffect(() => {
    setLayout(mobileScreen ? 'default' : 'alt')
  }, [mobileScreen])

  const toggleOpenNavbarStatus = () => {
    setOpenNavbar(!openNavbar)
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      layout={layout}
      navbar={<CustomNavbar opened={openNavbar} />}
      header={
        <CustomHeader
          opened={openNavbar}
          handleBurguerOpened={toggleOpenNavbarStatus}
        />
      }
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
