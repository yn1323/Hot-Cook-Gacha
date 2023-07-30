'use client'

import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment } from 'react'
import { MaxRecipeShowPerPage } from '@/constants/recipes'
import { GetRecipes } from '@/page/(auth)/recipes/api/route'
import { makeQueryParamsString } from '@/helpers/string'

type Props = {
  recipes: GetRecipes['response']['recipes']
  authors?: {
    id: string
    name: string
  }[]
  hideAuthor?: boolean
}

export const RecipeList = ({
  authors = [],
  recipes,
  hideAuthor = false,
}: Props) => {
  const router = useRouter()
  const params = useSearchParams()
  const paramsObject = {
    limit: params.get('limit'),
    orderBy: params.get('orderBy'),
    startAfter: params.get('startAfter'),
    endAt: params.get('endAt'),
    endBefore: params.get('endBefore'),
  }

  const nextPageHandler = () => {
    router.push(
      `/recipes/search?${makeQueryParamsString({
        ...paramsObject,
        startAfter: recipes[recipes.length - 1].recipeId,
      })}`
    )
  }

  return (
    <Fragment>
      <VStack divider={<Divider />} w="100%">
        {recipes.map(recipe => (
          <HStack
            key={recipe.recipeId}
            w="100%"
            h={24}
            gap={2}
            _hover={{ cursor: 'pointer', background: '#f9f9f9' }}
            onClick={() => {
              router.push(`/recipes/${recipe.recipeId}`)
            }}
          >
            <Box w={36} h="100%">
              {recipe.image ? (
                <Center
                  w="100%"
                  h="100%"
                  border="0px solid white"
                  borderRadius={10}
                >
                  <Image
                    w="100%"
                    h="100%"
                    src={recipe.image}
                    alt=""
                    border="0px solid white"
                    borderRadius={10}
                    objectFit={'cover'}
                  />
                </Center>
              ) : (
                <Center
                  w="100%"
                  h="100%"
                  background="rgba(0,0,0,0.2)"
                  border="0px solid white"
                  borderRadius={10}
                >
                  <Text color="white">No Image</Text>
                </Center>
              )}
            </Box>
            <VStack
              w="100%"
              alignItems="flex-start"
              justifyContent="flex-start"
              gap={0}
              h="100%"
            >
              <Text
                fontWeight="bold"
                color="green.700"
                textDecor="underline"
                noOfLines={1}
              >
                {recipe.title}
              </Text>
              {!hideAuthor && (
                <Text color="gray.600" fontSize="xs" mt={1} noOfLines={1}>
                  by{' '}
                  {authors.find(({ id }) => id === recipe.author)?.name ??
                    '詠み人知らず'}
                </Text>
              )}
              <Text fontSize="sm" noOfLines={2}>
                {recipe.ingredients
                  .map(({ ingredient }) => ingredient)
                  .join(' ')}
              </Text>
              {recipe.tags && recipe.tags.length > 0 && (
                <Text fontSize="xs" color="gray.400" noOfLines={1}>
                  {recipe.tags.join(' / ')}
                </Text>
              )}
            </VStack>
          </HStack>
        ))}
      </VStack>

      {recipes.length > 0 && (
        <HStack
          justifyContent="space-between"
          w="100%"
          textAlign="right"
          mt={3}
        >
          {paramsObject.startAfter || paramsObject.endAt ? (
            <Button colorScheme="green" onClick={() => router.back()}>
              前のページ
            </Button>
          ) : (
            <Spacer />
          )}

          {recipes.length >= MaxRecipeShowPerPage && (
            <Button colorScheme="green" onClick={nextPageHandler}>
              次のページ
            </Button>
          )}
        </HStack>
      )}

      {paramsObject.startAfter && recipes.length === 0 && (
        <Box w="100%">
          <Text color="gray.500" textAlign="center">
            これ以上レシピが見つかりませんでした。
          </Text>
          <HStack
            justifyContent="space-between"
            w="100%"
            textAlign="right"
            mt={20}
          >
            <Button colorScheme="green" onClick={() => router.back()}>
              前のページ
            </Button>
          </HStack>
        </Box>
      )}
    </Fragment>
  )
}