'use client'

import { VStack, Button, HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserNameInput } from '@/component/form/UserNameInput'
import { UserPictureInput } from '@/component/form/UserPictureInput'
import { commonSchemas } from '@/constants/validations'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

const Schema = z.object({
  name: commonSchemas.shape.name,
  picture: commonSchemas.shape.picture,
})

export type SchemaType = z.infer<typeof Schema>

type Props = {
  uid: string
  defaultValues?: Partial<SchemaType>
  onSubmit: (data: SchemaType, { uid }: { uid: string }) => Promise<boolean>
}

export const UserConfigForm = ({
  uid,
  defaultValues = {},
  onSubmit,
}: Props) => {
  const [isPending, startTransition] = useTransition()
  const { successToast, errorToast } = useCustomToast()
  const methods = useForm<SchemaType>({
    defaultValues,
    resolver: zodResolver(Schema),
  })

  const submitHandler: SubmitHandler<SchemaType> = async data => {
    startTransition(async () => {
      const result = await onSubmit(data, { uid })
      if (result) {
        successToast({ title: '変更しました' })
      } else {
        errorToast({ title: '変更に失敗しました' })
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <VStack w={360} spacing={6}>
          <UserPictureInput url={defaultValues.picture ?? ''} />
          <UserNameInput />
          <HStack justifyContent="flex-end" w="100%">
            <Button
              w={150}
              type="submit"
              isLoading={isPending}
              colorScheme="green"
            >
              変更する
            </Button>
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}
