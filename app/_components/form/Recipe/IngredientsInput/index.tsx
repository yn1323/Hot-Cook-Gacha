'use client'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Select,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useEffect, useMemo } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { RequiredBadge } from '@/component/form/Recipe/RequiredBadge'
import { recipeSchemas } from '@/constants/validations'

type Props = {
  required?: boolean
}

export const IngredientsInput = ({ required }: Props) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<{
    ingredients: z.infer<typeof recipeSchemas.shape.ingredients>
  }>()

  const errorMessages = useMemo(() => errors.ingredients, [errors.ingredients])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  useEffect(() => {
    fields.length === 0 &&
      append({ ingredient: '', amount: '', mark: '', prep: '', unit: '' })
  }, [fields, append])

  return (
    <FormControl id="ingredients">
      <FormLabel>
        材料
        {required && <RequiredBadge ml={4} />}
      </FormLabel>
      {fields.map((field, index) => (
        <Box key={field.id} pb={4}>
          <InputGroup>
            <VStack gap={4} w="100%">
              <FormControl isInvalid={!!errorMessages?.[index]?.ingredient}>
                <Controller
                  control={control}
                  name={`ingredients.${index}.ingredient`}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      placeholder="材料を入力してください"
                      data-testid="ingredients"
                      role="textbox"
                      maxLength={64}
                      {...field}
                    />
                  )}
                />
                {errorMessages?.[index]?.ingredient && (
                  <FormHelperText color="crimson">
                    {errorMessages?.[index]?.ingredient?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <HStack w="100%">
                <FormControl isInvalid={!!errorMessages?.[index]?.amount}>
                  <Controller
                    control={control}
                    name={`ingredients.${index}.amount`}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        placeholder="量を入力してください"
                        data-testid="amount"
                        role="textbox"
                        maxLength={64}
                        {...field}
                      />
                    )}
                  />
                  {errorMessages?.[index]?.amount && (
                    <FormHelperText color="crimson">
                      {errorMessages?.[index]?.amount?.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <VStack w={180} alignItems="flex-start" h="100%">
                  <Controller
                    control={control}
                    name={`ingredients.${index}.unit`}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field}>
                        <option value="">単位なし</option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="ko">個</option>
                        <option value="hon">本</option>
                        <option value="mai">枚</option>
                        <option value="fukuro">袋</option>
                        <option value="can">缶</option>
                        <option value="tableSpoon">大さじ</option>
                        <option value="teaSpoon">小さじ</option>
                      </Select>
                    )}
                  />
                </VStack>
              </HStack>
              <HStack w="100%">
                <Box w={100}>
                  <Controller
                    control={control}
                    name={`ingredients.${index}.mark`}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field}>
                        <option value="">-</option>
                        <option value="circle">●</option>
                        <option value="triangle">▲</option>
                        <option value="square">■</option>
                        <option value="star">★</option>
                      </Select>
                    )}
                  />
                </Box>
                <Controller
                  control={control}
                  name={`ingredients.${index}.prep`}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      placeholder="下ごしらえ、切り方など"
                      data-testid="prep"
                      role="textbox"
                      maxLength={64}
                      {...field}
                    />
                  )}
                />
              </HStack>
              <HStack w="100%" justifyContent="space-between" gap={4}>
                {fields.length > 1 && (
                  <Fragment>
                    <Button
                      visibility={index === 0 ? 'hidden' : 'visible'}
                      onClick={() => {
                        const currentField = getValues('ingredients')
                        const fieldToGoUp = currentField[index]
                        const fieldToGoDown = currentField[index - 1]
                        currentField[index - 1] = fieldToGoUp
                        currentField[index] = fieldToGoDown
                        setValue('ingredients', currentField)
                      }}
                      colorScheme="green"
                    >
                      ↑
                    </Button>

                    {index !== fields.length - 1 && (
                      <Button
                        onClick={() => {
                          const currentField = getValues('ingredients')
                          const fieldToGoUp = currentField[index]
                          const fieldToGoDown = currentField[index + 1]
                          currentField[index + 1] = fieldToGoUp
                          currentField[index] = fieldToGoDown
                          setValue('ingredients', currentField)
                        }}
                        colorScheme="green"
                      >
                        ↓
                      </Button>
                    )}

                    <Spacer />
                    <Button onClick={() => remove(index)} colorScheme="red">
                      削除
                    </Button>
                  </Fragment>
                )}
              </HStack>
            </VStack>
          </InputGroup>
          {index !== fields.length - 1 && (
            <Box
              w="100%"
              borderBottom="1px"
              borderStyle="dashed"
              borderColor="gray.200"
              mt={4}
            />
          )}
        </Box>
      ))}
      <Button
        colorScheme="green"
        onClick={() =>
          append({ ingredient: '', amount: '', mark: '', prep: '', unit: '' })
        }
      >
        材料を追加
      </Button>
    </FormControl>
  )
}

{
  /* {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )} */
}
