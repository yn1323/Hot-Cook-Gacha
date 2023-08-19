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
import { ServingOptions } from '@/src/constants/recipes'

type Props = {
  required?: boolean
}

export const ServingSelect = ({ required }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<{ servings: string }>()

  const errorMessage = useMemo(
    () => errors.servings?.message,
    [errors.servings?.message]
  )

  return (
    <FormControl id="servings" isInvalid={!!errors.servings}>
      <FormLabel>
        分量
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      <Select {...register('servings')}>
        {ServingOptions.map(({ value, label }) => (
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
