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
import { addIngredients } from '@/helpers/recipe'
import { RecipeType } from '@/page/(auth)/recipes/api/route'

type Props = {
  recipes: RecipeType[]
  term: number
}

export const GachaTotalIngredients = ({ recipes, term }: Props) => {
  const totalIngredients = useMemo(
    () => addIngredients(recipes.map(({ ingredients }) => ingredients).flat()),
    [recipes]
  )

  return (
    <Box w="100%" mt={4}>
      <Text fontSize="lg" as="b" w="100%">
        材料
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple w="100%" mt={4}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                全{term}日の材料
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="100%">
            {totalIngredients.map(({ name, amounts }, i) => (
              <HStack key={i} w="100%" mt={2}>
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
