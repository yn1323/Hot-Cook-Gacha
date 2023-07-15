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
  const { setValue, getValues, watch } = useFormContext<{ status: string }>()

  return (
    <FormControl id="status">
      <HStack alignItems="center">
        <FormLabel w={200} m={0} _hover={{ cursor: 'pointer' }}>
          レシピを公開する
        </FormLabel>
        <InputGroup>
          <Checkbox
            data-testid="status"
            onChange={e => {
              setValue('status', e.target.checked ? 'public' : 'private')
            }}
            checked={getValues('status') === 'public'}
            defaultChecked={getValues('status') === 'public'}
          />
        </InputGroup>
      </HStack>
    </FormControl>
  )
}
