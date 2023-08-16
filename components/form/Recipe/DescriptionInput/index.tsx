'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  Textarea,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {}

export const DescriptionInput = ({}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ description: string }>()

  const errorMessage = useMemo(
    () => errors.description?.message,
    [errors.description?.message]
  )

  return (
    <FormControl id="description" isInvalid={!!errors.description}>
      <FormLabel>紹介文</FormLabel>
      <InputGroup>
        <Textarea
          data-testid="description"
          role="textbox"
          maxLength={64}
          {...register('description')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
