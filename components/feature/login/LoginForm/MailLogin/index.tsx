'use client'

import { Box, Button, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { MailInput } from '@/components/form/MailInput'
import { PasswordInput } from '@/components/form/PasswordInput'
import { commonSchemas } from '@/src/constants/validations'
import { useSession } from '@/src/hooks/auth/useSession'

const Schema = z.object({
  email: commonSchemas.shape.email,
  password: commonSchemas.shape.password,
})

type SchemaType = z.infer<typeof Schema>

type Props = {
  isLoading: boolean
  onSubmit: ReturnType<typeof useSession>['handleEmailLogin']
}
export const MailLogin = ({ isLoading, onSubmit }: Props) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })

  const submitHandler: SubmitHandler<SchemaType> = async ({
    email,
    password,
  }) => {
    onSubmit(email, password)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <Stack spacing={4} w={300} role="form">
          <MailInput />
          <PasswordInput />
          <Box pt={2} w="100%">
            <Button
              w="100%"
              type="submit"
              isLoading={isLoading}
              colorScheme="green"
            >
              メールアドレスでログイン
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  )
}
