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

export const MailInput = ({ disabled }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ email: string }>()

  const errorMessage = useMemo(
    () => errors.email?.message,
    [errors.email?.message]
  )

  return (
    <FormControl id="email" isInvalid={!!errors.email}>
      <FormLabel>メールアドレス</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <FiMail />
        </InputLeftElement>
        <Input
          disabled={disabled}
          data-testid="email"
          role="textbox"
          maxLength={64}
          {...register('email')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
