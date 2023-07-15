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
        <option value="meat">肉のおかず</option>
        <option value="fish">魚のおかず</option>
        <option value="vegetable">野菜のおかず</option>
        <option value="egg">卵のおかず</option>
        <option value="seaweed">海藻類のおかず</option>
        <option value="tofu">大豆加工品のおかず</option>
        <option value="jerky">保存食のおかず</option>
        <option value="cheese">乳製品のおかず</option>
        <option value="salad">サラダ</option>
        <option value="soup">スープ・汁もの</option>
        <option value="rice">ご飯もの</option>
        <option value="ball">丼もの</option>
        <option value="pot">鍋もの</option>
        <option value="noodle">麺料理</option>
        <option value="other">その他</option>
      </Select>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
