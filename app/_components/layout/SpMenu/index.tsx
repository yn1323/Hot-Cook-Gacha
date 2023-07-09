'use client'

import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, HStack, VStack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import {
  BsFillCalendarCheckFill,
  BsFillPersonFill,
  BsSearch,
} from 'react-icons/bs'

const Icons = [
  { label: 'Top', icon: AiFillHome, link: '/dashboard' },
  { label: '献立ガチャ', icon: BsFillCalendarCheckFill, link: '/gacha' },
  {
    label: 'レシピ 検索',
    icon: BsSearch,
    link: '/search',
  },
  {
    label: 'マイページ',
    icon: BsFillPersonFill,
    link: '/mypage',
  },
]

const NavHeight = 14

type Props = {
  children: React.ReactNode
}

export const SpMenu = ({ children }: Props) => {
  const router = useRouter()
  return (
    <VStack position="relative">
      <Box mb={NavHeight}>{children}</Box>
      <HStack
        position="fixed"
        bottom={0}
        as="nav"
        w="100%"
        background="green.500"
        height={NavHeight}
        justifyContent="space-between"
        px={4}
      >
        {Icons.map(({ label, icon, link }, i) => (
          <Button
            key={i}
            h={NavHeight}
            w="100%"
            colorScheme="green"
            aria-label={label}
            onClick={() => router.push(link)}
          >
            <VStack>
              <Icon as={icon} h={5} w={5} />
              <Text fontSize="xs">{label}</Text>
            </VStack>
          </Button>
        ))}
      </HStack>
    </VStack>
  )
}
