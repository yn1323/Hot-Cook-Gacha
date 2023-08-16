'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdOutlineTitle } from 'react-icons/md'
import { RequiredBadge } from '@/components/form/Recipe/RequiredBadge'

type Props = {
  required?: boolean
}

export const TitleInput = ({ required }: Props) => {
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
      <FormLabel>
        料理名
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <MdOutlineTitle />
        </InputLeftElement>
        <Input
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
