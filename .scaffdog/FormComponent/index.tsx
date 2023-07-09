'use client'

import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  FormHelperText,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FiMail } from 'react-icons/fi'

type Props = {
  disabled?: boolean
}

export const {{ inputs.component | pascal }} = ({ disabled }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ {{ inputs.name }}: string }>()

  const errorMessage = useMemo(
    () => errors.{{ inputs.name }}?.message,
    [errors.{{ inputs.name }}?.message]
  )

  return (
    <FormControl id="{{ inputs.name }}" isInvalid={!!errors.{{ inputs.name }}}>
      <FormLabel>{{ inputs.name }}</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <FiMail />
        </InputLeftElement>
        <Input
          disabled={disabled}
          data-testid="{{ inputs.name }}"
          role="textbox"
          maxLength={64}
          {...register('{{ inputs.name }}')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
