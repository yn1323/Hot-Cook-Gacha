'use client'

import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {}

export const StatusInput = ({}: Props) => {
  const { getValues, register } = useFormContext<{ isPublic: boolean }>()

  return (
    <FormControl id="isPublic">
      <HStack alignItems="center">
        <FormLabel w={240} m={0} _hover={{ cursor: 'pointer' }}>
          レシピを公開する
        </FormLabel>
        <InputGroup>
          <Checkbox data-testid="isPublic" {...register('isPublic')} />
        </InputGroup>
      </HStack>
    </FormControl>
  )
}
