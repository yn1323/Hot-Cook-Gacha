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
import { MdOutlineTitle } from 'react-icons/md'

type Props = {
  disabled?: boolean
}

export const TitleInput = ({ disabled }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ title: string }>()

  const errorMessage = useMemo(
    () => errors.title?.message,
    [errors.title?.message]
  )

  return (
    <FormControl id="title" isInvalid={!!errors.title}>
      <FormLabel>料理名</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <MdOutlineTitle />
        </InputLeftElement>
        <Input
          disabled={disabled}
          data-testid="title"
          role="textbox"
          maxLength={64}
          {...register('title')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
