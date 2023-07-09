'use client'

import { Button, VStack } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

type Props = {
  isLoading: boolean
  handleGoogleLogin: () => void
}

export const GoogleLogin = ({ isLoading, handleGoogleLogin }: Props) => {
  return (
    <VStack spacing={4}>
      <Button
        w={300}
        fontSize="sm"
        isLoading={isLoading}
        leftIcon={<FcGoogle fontSize={18} />}
        onClick={handleGoogleLogin}
      >
        Googleでログイン
      </Button>
    </VStack>
  )
}
