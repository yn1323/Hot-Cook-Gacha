'use client'

import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useScreenSize } from '@/hooks/ui/useScreenSize'

type PropTypes = {
  children: JSX.Element | JSX.Element[]
  noBorder?: boolean
}

export const CenterBox: FC<PropTypes> = ({ children, noBorder }) => {
  const { isPC } = useScreenSize()
  return (
    <VStack h={'calc(100vh - 56px - 32px)'} justifyContent="center">
      {isPC ? (
        <VStack
          shadow={noBorder ? undefined : 'md'}
          border={noBorder ? undefined : '1px'}
          borderColor="gray.200"
          borderRadius="20px"
          py={12}
          px={4}
          w="400px"
        >
          {children}
        </VStack>
      ) : (
        children
      )}
    </VStack>
  )
}
