'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { TermOptions } from '@/constants/gacha'

export const TermSelect = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ term: string }>()

  const errorMessage = useMemo(
    () => errors.term?.message,
    [errors.term?.message]
  )

  return (
    <FormControl id="term" isInvalid={!!errors.term}>
      <FormLabel>日数</FormLabel>
      <Select {...register('term')} defaultValue="5">
        {TermOptions.map(({ value, label }) => (
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
