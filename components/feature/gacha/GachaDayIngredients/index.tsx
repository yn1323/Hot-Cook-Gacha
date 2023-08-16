'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { addIngredients } from '@/src/helpers/recipe'

type Props = {
  recipes: RecipeType[]
  title: string
}

export const GachaDayIngredients = ({ title, recipes }: Props) => {
  const ingredients = useMemo(
    () => addIngredients(recipes.map(({ ingredients }) => ingredients).flat()),
    [recipes]
  )

  return (
    <Box w="100%">
      <Accordion allowMultiple w="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="100%">
            {ingredients.map(({ name, amounts }, i) => (
              <HStack key={i} w="100%">
                <Text w="60%">{name}</Text>
                <UnorderedList>
                  {amounts.map((amount, j) => (
                    <ListItem key={j}>{amount}</ListItem>
                  ))}
                </UnorderedList>
              </HStack>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
