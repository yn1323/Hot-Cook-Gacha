'use client'

import {
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Skeleton,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiFillCamera } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Resizer from 'react-image-file-resizer'
import { useCustomToast } from '../../../../src/hooks/ui/useCustomToast'

const AcceptImageType = ['image/png', 'image/jpeg', 'image/gif']
const MaxImageSize = 10 // MB

type Props = {
  url?: string
  label: string
}
export const ImageInput = ({ url = '', label }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const { errorToast } = useCustomToast()
  const { register, setValue, getValues, watch } = useFormContext<{
    image: string
  }>()

  watch('image')

  const initialImage = getValues('image')

  const onClickButton = () => {
    inputRef.current?.click()
  }

  const onDeleteImage = () => {
    setUploadedImage(null)
    setValue('image', '')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <FormControl id="image">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <HStack justifyContent={'space-around'} w="100%">
          {uploadedImage || initialImage ? (
            <Box position="relative" w="100%">
              <Image
                src={uploadedImage ?? initialImage}
                alt={label}
                w="100%"
                h={200}
                objectFit="contain"
                onClick={() => onClickButton()}
              />
              <IconButton
                onClick={onDeleteImage}
                position="absolute"
                top="0"
                right="0"
                color="white"
                aria-label="画像を削除"
                icon={<FiDelete />}
                variant="ghost"
                size="lg"
                background="rgba(0,0,0,0.2)"
              />
            </Box>
          ) : (
            <Center
              w="100%"
              h={200}
              onClick={() => onClickButton()}
              background="gray.200"
            >
              {isLoading ? (
                <Skeleton h="100%" w="100%" />
              ) : (
                <Icon as={AiFillCamera} h={16} w={16} color="gray.600" />
              )}
            </Center>
          )}

          <input
            type="file"
            ref={inputRef}
            hidden
            onChange={async e => {
              setIsLoading(true)
              if (!e.target.files) return
              const { type, size } = e.target.files[0]
              if (!AcceptImageType.includes(type)) {
                errorToast({
                  title: '画像フォーマットエラー',
                  description: '画像フォーマットはpng,jpeg,gifのみです。',
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

              setUploadedImage(base64Image)
              setValue('image', base64Image)
              setIsLoading(false)
            }}
          />
        </HStack>
        <Input
          hidden
          data-testid="image"
          role="textbox"
          value={uploadedImage ?? url}
          maxLength={40}
          {...register('image')}
        />
      </InputGroup>
    </FormControl>
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
