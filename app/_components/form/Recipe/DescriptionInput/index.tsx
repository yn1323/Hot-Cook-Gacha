'use client'

import {
  FormControl,
  FormLabel,
  InputGroup,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  disabled?: boolean
}

export const DescriptionInput = ({ disabled }: Props) => {
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
          disabled={disabled}
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
