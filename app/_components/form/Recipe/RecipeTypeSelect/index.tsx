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
import { RecipeTypeOptions } from '@/constants/recipes'

type Props = {
  required?: boolean
}

export const RecipeTypeSelect = ({ required }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ type: string }>()

  const errorMessage = useMemo(
    () => errors.type?.message,
    [errors.type?.message]
  )

  return (
    <FormControl id="type" isInvalid={!!errors.type}>
      <FormLabel>
        種類
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      <Select
        placeholder="レシピの種類を選択してください"
        {...register('type')}
      >
        {RecipeTypeOptions.map(({ value, label }) => (
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
