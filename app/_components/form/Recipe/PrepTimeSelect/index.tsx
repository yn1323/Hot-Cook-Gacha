'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  disabled?: boolean
}

export const PrepTimeSelect = ({ disabled }: Props) => {
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
      <FormLabel>準備時間（ホットクックを除く）</FormLabel>
      <Select {...register('prepTime')}>
        <option value="5">5分</option>
        <option value="10">10分</option>
        <option value="15">15分</option>
        <option value="30">30分</option>
        <option value="60">1時間</option>
        <option value="90">1.5時間</option>
        <option value="moreThan120">2時間以上</option>
      </Select>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
