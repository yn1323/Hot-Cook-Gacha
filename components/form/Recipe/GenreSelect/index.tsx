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
import { GenreOptions } from '@/src/constants/recipes'

type Props = {
  required?: boolean
}

export const GenreSelect = ({ required }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ genre: string }>()

  const errorMessage = useMemo(
    () => errors.genre?.message,
    [errors.genre?.message]
  )

  return (
    <FormControl id="genre" isInvalid={!!errors.genre}>
      <FormLabel>
        ジャンル
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      <Select placeholder="ジャンルを選択してください" {...register('genre')}>
        {GenreOptions.map(({ value, label }) => (
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
