'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  disabled?: boolean
}

export const ServingSelect = ({ disabled }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<{ servings: string }>()

  useEffect(() => {
    setValue('servings', '2')
  }, [setValue])

  const errorMessage = useMemo(
    () => errors.servings?.message,
    [errors.servings?.message]
  )

  return (
    <FormControl id="servings" isInvalid={!!errors.servings}>
      <FormLabel>分量</FormLabel>
      <Select {...register('servings')}>
        <option value="1">1人前</option>
        <option value="2">2人前</option>
        <option value="3">3人前</option>
        <option value="4">4人前</option>
        <option value="moreThan5">5人前以上</option>
      </Select>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
