'use client'

import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
import {
  GenreOptions,
  MarkOptions,
  PrepTimeOptions,
  RecipeTypeOptions,
  ServingOptions,
  UnitOptions,
} from '@/constants/recipes'
import { firebaseDateToStr } from '@/helpers/date'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'

type Props = {
  recipe: GetRecipe['response']['recipe'] & {
    recipeId: string
    authorName: string
    authorPicture?: string
  }
  isEditable?: boolean
}

export const RecipeDetail = ({ recipe, isEditable = false }: Props) => {
  const router = useRouter()
  return (
    <VStack w="100%" gap={5}>
      <Text
        color="green.800"
        w="100%"
        as="h1"
        fontSize="2xl"
        noOfLines={1}
        textAlign="center"
      >
        {recipe.title}
      </Text>
      {isEditable && (
        <Box textAlign="right" w="100%">
          <Button
            colorScheme="green"
            onClick={() => {
              router.push(`/recipes/${recipe.recipeId}/edit`)
            }}
          >
            編集する
          </Button>
        </Box>
      )}
      {recipe.image ? (
        <Center h={72} w="100%">
          <Image
            src={recipe.image}
            alt="recipe"
            w="100%"
            h={200}
            objectFit="contain"
          />
        </Center>
      ) : (
        <Box h={72} w="100%">
          <Center
            w="100%"
            h="100%"
            background="rgba(0,0,0,0.2)"
            border="0px solid white"
            borderRadius={10}
          >
            <Text color="white">No Image</Text>
          </Center>
        </Box>
      )}

      {recipe.description && (
        <Fragment>
          <Text fontSize="sm" color="gray.700" textAlign="left" w="100%">
            {recipe.description}
          </Text>
          <Divider />
        </Fragment>
      )}

      <HStack w="100%" justifyContent="space-around">
        <HStack w="100%">
          {recipe.authorPicture ? (
            <Image
              src={recipe.authorPicture}
              h={8}
              alt={`${recipe.authorName}の画像`}
            />
          ) : (
            <Box h={8}>
              <Icon as={BsFillPersonFill} h={8} w={8} color="gray.600" />
            </Box>
          )}
          <Text noOfLines={1}>{recipe.authorName}</Text>
        </HStack>

        <Center mr={4}>
          <Icon
            as={MdFavorite}
            h={6}
            w={6}
            color="gray.300"
            onClick={() => {
              alert('お気に入り機能を作りたい....!')
            }}
            _hover={{ cursor: 'pointer' }}
          />
        </Center>
      </HStack>

      {recipe.tags && recipe.tags.length > 0 && (
        <HStack w="100%">
          {recipe.tags.map((tag, index) => (
            <Button
              key={index}
              colorScheme="green"
              variant="outline"
              size="sm"
              onClick={() => alert('タグで検索できるようにしたい....!')}
            >
              {tag}
            </Button>
          ))}
        </HStack>
      )}

      <Divider />

      <HStack w="100%" justifyContent="space-between">
        <Text>ジャンル</Text>
        <Button as="span" colorScheme="green" variant="outline">
          {GenreOptions.find(({ value }) => value === recipe.genre)?.label ??
            ''}
        </Button>
      </HStack>

      <HStack w="100%" justifyContent="space-between">
        <Text>種類</Text>
        <Button as="span" colorScheme="green" variant="outline">
          {RecipeTypeOptions.find(({ value }) => value === recipe.type)
            ?.label ?? ''}
        </Button>
      </HStack>

      <HStack w="100%" justifyContent="space-between">
        <Text>
          準備時間
          <br />
          (ホッククック調理を除く)
        </Text>
        <Button as="span" colorScheme="green" variant="outline">
          {PrepTimeOptions.find(({ value }) => value === recipe.prepTime)
            ?.label ?? ''}
        </Button>
      </HStack>

      <Divider />

      <VStack w="100%">
        <Text w="100" fontSize="lg">
          材料 (
          {ServingOptions.find(({ value }) => value === recipe.servings)
            ?.label ?? ''}
          )
        </Text>

        <VStack w="100%" spacing={4}>
          {recipe.ingredients.map((ingredient, index) => (
            <VStack w="100%" key={index}>
              <HStack w="100%" justifyContent="space-between">
                <Box w="60%">
                  <Text textAlign="right" noOfLines={5} fontSize="sm">
                    {MarkOptions.find(({ value }) => value === ingredient.mark)
                      ?.label ?? ''}
                    {ingredient.ingredient}
                  </Text>
                  {ingredient.prep && (
                    <Text textAlign="right" fontSize="sm">
                      ({ingredient.prep})
                    </Text>
                  )}
                </Box>
                <Text w="40%" noOfLines={5} textAlign="center" fontSize="sm">
                  {ingredient.amount}{' '}
                  {UnitOptions.find(({ value }) => value === ingredient.unit)
                    ?.label === '単位なし'
                    ? ''
                    : UnitOptions.find(({ value }) => value === ingredient.unit)
                        ?.label ?? ''}
                </Text>
              </HStack>
            </VStack>
          ))}
        </VStack>
      </VStack>

      <Divider />

      {recipe.preDirections && (
        <Fragment>
          <VStack w="100%" spacing={4}>
            <VStack w="100%">
              <Text w="100" fontSize="lg">
                下準備
              </Text>
              {recipe.preDirections.map((direction, index) => (
                <HStack w="100%" key={index} justifyContent="space-between">
                  <Button w="10%">{index + 1}</Button>
                  <Text w={direction.image ? '50%' : '90%'} fontSize="sm">
                    {direction.direction}
                  </Text>
                  {direction.image && (
                    <Image
                      src={direction.image}
                      w="40%"
                      alt={direction.direction}
                    />
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
          <Divider />
        </Fragment>
      )}

      {recipe.hotcookDirections && (
        <Fragment>
          <VStack w="100%" spacing={4}>
            <VStack w="100%">
              <Text w="100" fontSize="lg">
                ホットクック操作
              </Text>
              {recipe.hotcookDirections.map((direction, index) => (
                <HStack w="100%" key={index} justifyContent="space-between">
                  <Button w="10%">{index + 1}</Button>
                  <Text w={direction.image ? '50%' : '90%'} fontSize="sm">
                    {direction.direction}
                  </Text>
                  {direction.image && (
                    <Image
                      src={direction.image}
                      w="40%"
                      alt={direction.direction}
                    />
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
          <Divider />
        </Fragment>
      )}

      {recipe.postDirections && (
        <Fragment>
          <VStack w="100%" spacing={4}>
            <VStack w="100%">
              <Text w="100" fontSize="lg">
                仕上げ
              </Text>
              {recipe.postDirections.map((direction, index) => (
                <HStack w="100%" key={index} justifyContent="space-between">
                  <Button w="10%">{index + 1}</Button>
                  <Text w={direction.image ? '50%' : '90%'} fontSize="sm">
                    {direction.direction}
                  </Text>
                  {direction.image && (
                    <Image
                      src={direction.image}
                      w="40%"
                      alt={direction.direction}
                    />
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
          <Divider />
        </Fragment>
      )}

      <Text w="100%" textAlign="right">
        作成日：{firebaseDateToStr(recipe.dateCreated, 'yyyy年MM月dd日')}
      </Text>
    </VStack>
  )
}
