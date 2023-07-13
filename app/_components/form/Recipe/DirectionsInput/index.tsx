'use client'

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  InputGroup,
  Skeleton,
  Spacer,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { AiFillCamera } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Resizer from 'react-image-file-resizer'
import { z } from 'zod'
import { recipeSchemas } from '@/constants/validations'
import { useCustomToast } from '@/hooks/ui/useCustomToast'
const AcceptImageType = ['image/png', 'image/jpeg', 'image/gif']
const MaxImageSize = 10 // MB

type Props = {
  disabled?: boolean
  name: 'preDirections' | 'postDirections' | 'hotcookDirections'
}

export const DirectionsInput = ({ disabled, name }: Props) => {
  const shape = recipeSchemas.shape[name]
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<{
    [name: string]: z.infer<typeof shape>
  }>()

  const inputRef = useRef<(HTMLInputElement | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const { errorToast } = useCustomToast()

  watch(name)

  const errorMessages = useMemo(() => errors[name], [errors, name])

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const onAppend = () => {
    inputRef.current = [...inputRef.current, null]
    append({ direction: '', image: '' })
  }
  const onRemove = (index: number) => {
    inputRef.current = inputRef.current.filter((_, i) => i !== index)
    remove(index)
  }
  const onChangeOrder = (index1: number, index2: number) => {
    const currentField = getValues(name)
    const fieldToGoUp = currentField[index1]
    const fieldToGoDown = currentField[index2]
    currentField[index2] = fieldToGoUp
    currentField[index1] = fieldToGoDown
    setValue(name, currentField)
  }

  const onClickButton = (index: number) => {
    inputRef.current?.[index]?.click()
  }

  const onDeleteImage = (index: number) => {
    setUploadedImage(null)
    const values = getValues(name)
    setValue(
      name,
      values.map((value, i) => (i === index ? { ...value, image: '' } : value))
    )

    if (inputRef.current && inputRef.current[index]) {
      inputRef.current[index] = null
    }
  }

  return (
    <Fragment>
      {fields.map((field, index) => (
        <Box key={field.id} pb={4}>
          <FormControl isInvalid={!!errorMessages?.[index]?.direction}>
            <FormLabel>手順{index + 1}</FormLabel>
            <InputGroup>
              <VStack w="100%">
                <HStack w="100%">
                  <Controller
                    control={control}
                    name={`preDirections.${index}.direction`}
                    defaultValue=""
                    render={({ field }) => (
                      <Textarea
                        placeholder={`手順${index + 1}`}
                        data-testid="direction"
                        maxLength={500}
                        {...field}
                      />
                    )}
                  />
                  {errorMessages?.[index]?.direction && (
                    <FormHelperText color="crimson">
                      {errorMessages?.[index]?.direction?.message}
                    </FormHelperText>
                  )}
                  <Flex w={40} h="100%">
                    {field.image ? (
                      <Box position="relative">
                        <Image
                          src={field.image}
                          alt={''}
                          w="100%"
                          h="100%"
                          onClick={() => onClickButton(index)}
                          objectFit="contain"
                        />
                        <IconButton
                          onClick={() => onDeleteImage(index)}
                          position="absolute"
                          top="0"
                          right="0"
                          color="white"
                          aria-label="画像を削除"
                          icon={<FiDelete />}
                          variant="ghost"
                          size="md"
                          background="rgba(0,0,0,0.2)"
                        />
                      </Box>
                    ) : (
                      <Center
                        w="100%"
                        h="100%"
                        onClick={() => onClickButton(index)}
                        background="gray.200"
                      >
                        {isLoading ? (
                          <Skeleton h="100%" w="100%" />
                        ) : (
                          <Icon
                            as={AiFillCamera}
                            h={8}
                            w={8}
                            color="gray.600"
                          />
                        )}
                      </Center>
                    )}
                    <input
                      type="file"
                      ref={el => (inputRef.current[index] = el)}
                      hidden
                      onChange={async e => {
                        setIsLoading(true)
                        if (!e.target.files) return
                        const { type, size } = e.target.files[0]
                        if (!AcceptImageType.includes(type)) {
                          errorToast({
                            title: '画像フォーマットエラー',
                            description:
                              '画像フォーマットはpng,jpeg,gifのみです。',
                          })
                          setIsLoading(false)
                          return
                        }

                        if (size / 1024 ** 2 > MaxImageSize) {
                          errorToast({
                            title: '画像サイズエラー',
                            description: `${MaxImageSize}MB以下の画像を選択してください。`,
                          })
                          setIsLoading(false)
                          return
                        }
                        const base64Image = await resizeFile(e.target.files[0])
                        const values = getValues(name)

                        setUploadedImage(base64Image)
                        setValue(
                          name,
                          values.map((value, i) =>
                            i === index
                              ? { ...value, image: base64Image }
                              : value
                          )
                        )
                        setIsLoading(false)
                      }}
                    />
                  </Flex>
                </HStack>
                <HStack w="100%" justifyContent="space-between" gap={4}>
                  {fields.length > 1 && (
                    <Fragment>
                      <Button
                        visibility={index === 0 ? 'hidden' : 'visible'}
                        onClick={() => {
                          onChangeOrder(index, index - 1)
                        }}
                        colorScheme="green"
                      >
                        ↑
                      </Button>
                      {index !== fields.length - 1 && (
                        <Button
                          onClick={() => {
                            onChangeOrder(index, index + 1)
                          }}
                          colorScheme="green"
                        >
                          ↓
                        </Button>
                      )}
                      <Spacer />
                      <Button onClick={() => onRemove(index)} colorScheme="red">
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
          </FormControl>
        </Box>
      ))}
      {fields.length < 20 && (
        <Button mt={4} colorScheme="green" onClick={onAppend}>
          追加
        </Button>
      )}
      <FormControl id="preDirections" isInvalid={!!errorMessages?.message}>
        {errorMessages?.message && (
          <FormHelperText color="crimson">
            {errorMessages?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Fragment>
  )
}

function resizeFile(file: Blob): Promise<string> {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      500, // maxWidth
      500, // maxHeight
      'png',
      100,
      0,
      uri => {
        resolve(uri as string)
      },
      'base64'
    )
  })
}
