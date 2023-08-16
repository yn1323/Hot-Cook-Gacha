'use client'

import { Button, Flex, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiCapsuleFill } from 'react-icons/ri'
import { z } from 'zod'
import { gachaRandomGetFormAction } from '@/components/feature/gacha/GachaForm/action'
import { CookPerDaySelect } from '@/components/form/Gacha/CookPerDaySelect'
import { TermSelect } from '@/components/form/Gacha/TermSelect'
import { gachaSchemas } from '@/src/constants/validations'

const Schema = gachaSchemas
export type SchemaType = z.infer<typeof Schema>
type Props = {
  onSubmit?: typeof gachaRandomGetFormAction
}

export const GachaForm = ({ onSubmit }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [isInitial, setIsInitial] = useState(true)

  const router = useRouter()

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })

  const { handleSubmit } = methods

  const submitHandler = (data: SchemaType) => {
    if (!onSubmit) return
    startTransition(async () => {
      const { recipeIds } = await onSubmit(data)
      router.push(
        `/gacha?ids=${recipeIds}&term=${data.term}&cookPerDay=${data.cookPerDay}`
      )
      setIsInitial(false)
    })
  }

  return (
    <FormProvider {...methods}>
      <VStack w="100%" as="form" onSubmit={handleSubmit(submitHandler)} gap={6}>
        <Flex gap={4} w="100%">
          <TermSelect />
          <CookPerDaySelect />
        </Flex>
        <Button
          w="50%"
          colorScheme="green"
          type="submit"
          isLoading={isPending}
          rightIcon={<RiCapsuleFill />}
          leftIcon={<RiCapsuleFill />}
          iconSpacing={8}
        >
          {isInitial ? 'ガチャ！' : 'もう一回！'}
        </Button>
      </VStack>
    </FormProvider>
  )
}
