'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { RequiredBadge } from '@/component/form/Recipe/RequiredBadge'

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
        <option value="homemade">家庭料理</option>
        <option value="japanese">和風</option>
        <option value="western">洋風</option>
        <option value="chinese">中華</option>
        <option value="ethnic">エスニック</option>
        <option value="other">その他</option>
      </Select>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
