'use client'

import { Box, Button } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { useSession } from '@/hooks/auth/useSession'

export const Logout = () => {
  const { logout } = useSession()

  return (
    <Box w="100%">
      <Button
        w="100%"
        colorScheme="green"
        variant="ghost"
        leftIcon={<BiLogOut />}
        onClick={logout}
      >
        ログアウト
      </Button>
    </Box>
  )
}
