'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { SearchQueryParams } from '@/component/feature/recipe/RecipeSearchForm/action'

const OrderParams = [
  { label: '掲載日', value: 'dateCreated' },
  { label: 'レシピID', value: 'recipeId' },
] as const

type Props = {
  orderParams?: SearchQueryParams['oderBy']
}

export const RecipeSearchForm = ({ orderParams }: Props) => {
  const router = useRouter()
  const [order, setOrder] = useState(orderParams)
  const [isPending, startTransition] = useTransition()

  const orderContentLabel = useMemo(() => {
    let label = 'なし'
    if (orderParams === 'dateCreated') {
      label = '掲載日'
    } else if (orderParams === 'recipeId') {
      label = 'レシピID'
    }
    return label
  }, [orderParams])

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              並び順：{orderContentLabel}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack gap={2} justifyContent="flex-start" justify="flex-start">
            <HStack w="100%">
              <Text fontSize="lg">並び順：</Text>
              <HStack mt={1}>
                {OrderParams.map(({ label, value }) => (
                  <Button
                    key={value}
                    colorScheme={value === order ? 'teal' : undefined}
                    onClick={() => setOrder(value)}
                  >
                    {label}
                  </Button>
                ))}
              </HStack>
            </HStack>
            <HStack justifyContent="flex-end" w="100%">
              <Button
                isLoading={isPending}
                colorScheme="green"
                onClick={() =>
                  startTransition(() => {
                    router.push(`/recipes/search?orderBy=${order}`)
                  })
                }
              >
                検索
              </Button>
            </HStack>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
