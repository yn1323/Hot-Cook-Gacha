'use client'

import { Badge } from '@chakra-ui/react'

type Props = {
  ml?: number
}

export const RequiredBadge = ({ ml = 0 }: Props) => {
  return (
    <Badge colorScheme="red" ml={ml}>
      必須
    </Badge>
  )
}
