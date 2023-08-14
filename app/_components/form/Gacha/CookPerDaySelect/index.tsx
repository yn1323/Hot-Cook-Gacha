'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { CookPerDayOptions } from '@/constants/gacha'

export const CookPerDaySelect = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ cookPerDay: string }>()

  const errorMessage = useMemo(
    () => errors.cookPerDay?.message,
    [errors.cookPerDay?.message]
  )

  return (
    <FormControl id="cookPerDay" isInvalid={!!errors.cookPerDay}>
      <FormLabel>1日のレシピ数</FormLabel>
      <Select {...register('cookPerDay')} defaultValue={'1'}>
        {CookPerDayOptions.map(({ value, label }) => (
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
