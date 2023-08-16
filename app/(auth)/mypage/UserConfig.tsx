'use client'

import { Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { ComponentProps } from 'react'
import { UserConfigForm } from '@/components/feature/userConfig/UserConfigForm'

type Props = ComponentProps<typeof UserConfigForm>

const UserConfig = (props: Props) => {
  const params = useSearchParams()

  return (
    <VStack gap={8} w="100%">
      <Text fontSize="2xl">プロフィール</Text>
      <UserConfigForm {...props} />
    </VStack>
  )
}

export default UserConfig
