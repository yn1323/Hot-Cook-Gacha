'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { RequiredBadge } from '@/components/form/Recipe/RequiredBadge'
import { PrepTimeOptions } from '@/src/constants/recipes'

type Props = {
  required?: boolean
}

export const PrepTimeSelect = ({ required }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ prepTime: string }>()

  const errorMessage = useMemo(
    () => errors.prepTime?.message,
    [errors.prepTime?.message]
  )

  return (
    <FormControl id="prepTime" isInvalid={!!errors.prepTime}>
      <FormLabel>
        準備時間（ホットクックを除く）
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      <Select {...register('prepTime', { valueAsNumber: true })}>
        {PrepTimeOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
