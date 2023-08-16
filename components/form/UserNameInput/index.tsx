'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { RiUser3Line } from 'react-icons/ri'

export const UserNameInput: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ name: string }>()

  const errorMessage = useMemo(
    () => errors.name?.message,
    [errors.name?.message]
  )

  return (
    <FormControl id="name" isInvalid={!!errors.name}>
      <FormLabel>ユーザー名</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <RiUser3Line />
        </InputLeftElement>
        <Input
          data-testid="password"
          role="textbox"
          maxLength={40}
          {...register('name')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
