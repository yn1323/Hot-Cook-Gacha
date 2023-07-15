'use client'

import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  disabled?: boolean
}

export const StatusInput = ({ disabled }: Props) => {
  const { setValue, getValues } = useFormContext<{ status: string }>()

  return (
    <FormControl id="status">
      <HStack alignItems="center">
        <FormLabel w={200} m={0} _hover={{ cursor: 'pointer' }}>
          レシピを公開する
        </FormLabel>
        <InputGroup>
          <Checkbox
            disabled={disabled}
            data-testid="status"
            onChange={e => {
              setValue('status', e.target.checked ? 'public' : 'private')
            }}
            value={`${getValues('status') === 'public'}`}
          />
        </InputGroup>
      </HStack>
    </FormControl>
  )
}
