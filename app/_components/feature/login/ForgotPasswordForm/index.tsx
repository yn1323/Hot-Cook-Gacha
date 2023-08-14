'use client'

import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { MailInput } from '@/component/form/MailInput'
import { commonSchemas } from '@/constants/validations'
import { useSession } from '@/hooks/auth/useSession'

const Schema = z.object({
  email: commonSchemas.shape.email,
})

type SchemaType = z.infer<typeof Schema>
export const ForgotPasswordForm = () => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })
  const { handleSendPasswordResetMail, emailLoginLoading } = useSession()

  const onSubmit: SubmitHandler<SchemaType> = async ({ email }) => {
    handleSendPasswordResetMail(email)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={4} w={300} role="form">
          <MailInput />
          <Box pt={2} w="100%">
            <Button
              w="100%"
              type="submit"
              isLoading={emailLoginLoading}
              colorScheme="green"
            >
              パスワードリセット
            </Button>
          </Box>
          <VStack alignItems="flex-end" w={300}>
            <Text as="u">
              <Link href="/">
                <Button variant="link" size="sm">
                  ログイン画面に戻る
                </Button>
              </Link>
            </Text>
          </VStack>
        </Stack>
      </form>
    </FormProvider>
  )
}
