'use client'

import { Box, Center } from '@chakra-ui/react'
import Image from 'next/image'
import loading from './images/loading.gif'

export const PageLoading = () => {
  return (
    <Box h="80vh">
      <Center>
        <Image src={loading} alt="loading" />
      </Center>
    </Box>
  )
}
