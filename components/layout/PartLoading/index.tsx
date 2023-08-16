'use client'

import { Box, Center, Spinner } from '@chakra-ui/react'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Box>

export const PartLoading = (props: Props) => {
  return (
    <Box h={props.h ?? '50vh'}>
      <Center h="100%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </Box>
  )
}
