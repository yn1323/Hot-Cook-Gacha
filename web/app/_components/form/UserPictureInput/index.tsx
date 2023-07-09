'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Image,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Resizer from 'react-image-file-resizer'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

const AcceptImageType = ['image/png', 'image/jpeg', 'image/gif']
const MaxImageSize = 10 // MB

type Props = {
  url: string
}
export const UserPictureInput = ({ url }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const { errorToast } = useCustomToast()
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<{ picture: string }>()

  const errorMessage = useMemo(
    () => errors.picture?.message,
    [errors.picture?.message]
  )

  const onClickButton = () => {
    inputRef.current?.click()
  }

  return (
    <FormControl id="picture" isInvalid={!!errors.picture}>
      <FormLabel>アバター</FormLabel>
      <InputGroup>
        <HStack justifyContent={'space-around'} w="100%">
          <Image
            borderRadius="full"
            boxSize="100px"
            src={uploadedImage ?? url}
            alt="avatar"
          />
          <Button
            size="sm"
            onClick={() => onClickButton()}
            isLoading={isLoading}
          >
            画像アップロード
          </Button>
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
              setValue('picture', base64Image)
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
          {...register('picture')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

function resizeFile(file: Blob): Promise<string> {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
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
