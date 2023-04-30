import React from 'react'
import { Flex, Loader } from '@mantine/core'

const LoadingScreen = () => {
  return (
    <Flex align="center" justify="center">
      <Loader size={30} />
    </Flex>
  )
}

export default LoadingScreen
