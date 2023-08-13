'use client'

import { Box, Center, HStack, Image, Skeleton, Text } from '@chakra-ui/react'

type Props = {
  thumbnails: {
    image: string
    recipeId: string
  }[]

  isLoading?: boolean
}

export const RecipeThumbnail = ({ isLoading, thumbnails }: Props) => {
  return (
    <HStack h={20} w="100%">
      {thumbnails.map((thumbnail, i) => {
        return (
          <Box w={`min(${100 / thumbnails.length}%, 20%)`} h="100%" key={i}>
            {thumbnail.image ? (
              <Skeleton
                isLoaded={!isLoading}
                w="100%"
                h="100%"
                borderRadius={10}
              >
                <Center
                  w="inherit"
                  h="inherit"
                  border="0px solid white"
                  borderRadius="inherit"
                >
                  <Image
                    w="100%"
                    h="100%"
                    src={thumbnail.image}
                    alt=""
                    border="0px solid white"
                    borderRadius={10}
                    objectFit={'cover'}
                  />
                </Center>
              </Skeleton>
            ) : (
              <Skeleton
                isLoaded={!isLoading}
                w="100%"
                h="100%"
                borderRadius={10}
              >
                <Center
                  w="inherit"
                  h="inherit"
                  background="rgba(0,0,0,0.2)"
                  border="0px solid white"
                  borderRadius="inherit"
                >
                  <Text color="white">No Image</Text>
                </Center>
              </Skeleton>
            )}
          </Box>
        )
      })}
    </HStack>
  )
}
