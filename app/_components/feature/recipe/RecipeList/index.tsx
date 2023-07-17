'use client'

import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { GetRecipes } from '@/page/(auth)/recipes/api/route'

type Props = {
  recipes: GetRecipes['response']['recipes']
  authors: {
    id: string
    name: string
  }[]
}

export const RecipeList = ({ authors, recipes }: Props) => {
  const router = useRouter()

  return (
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
            <Text color="gray.600" fontSize="xs" mt={1} noOfLines={1}>
              by{' '}
              {authors.find(({ id }) => id === recipe.author)?.name ??
                '詠み人知らず'}
            </Text>
            <Text fontSize="sm" noOfLines={2}>
              {recipe.ingredients.map(({ ingredient }) => ingredient).join(' ')}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  )
}
