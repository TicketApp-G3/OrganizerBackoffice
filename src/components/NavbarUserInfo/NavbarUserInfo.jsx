import React, { useContext } from 'react'
import { ActionIcon, Avatar, Box, Flex, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { AuthContext } from '../../contexts/AuthProvider'

const NavbarUserInfo = ({ user }) => {
  const { profileImage, name, lastName, email } = user
  const { logout } = useContext(AuthContext)

  return (
    <Flex align="center" justify="spaceBetween" w="100%" mt="auto">
      <Flex w="100%" align="center">
        <Avatar src={profileImage} radius="xl" />
        <Box w="100%" ml={10}>
          <Text size="xs" weight={500}>
            {name} {lastName}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Box>
        <ActionIcon onClick={logout}>
          <IconLogout size={20} />
        </ActionIcon>
      </Flex>
    </Flex>
  )
}

export default NavbarUserInfo
