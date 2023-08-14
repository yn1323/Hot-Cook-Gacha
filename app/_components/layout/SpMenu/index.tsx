'use client'

import { Button } from '@chakra-ui/button'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Icon, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import {
  BsFillCalendarCheckFill,
  BsFillPersonFill,
  BsSearch,
} from 'react-icons/bs'
import { MdPostAdd } from 'react-icons/md'

const Icons = [
  { label: 'Top', icon: AiFillHome, link: '/dashboard' },
  { label: '献立ガチャ', icon: BsFillCalendarCheckFill, link: '/gacha' },
  {
    label: 'レシピ 検索',
    icon: BsSearch,
    link: '/recipes/search',
  },
  {
    label: '投稿',
    icon: MdPostAdd,
    link: '/recipes/post',
  },
  {
    label: 'マイページ',
    icon: BsFillPersonFill,
    link: '/mypage',
  },
]

export const LayoutStyles = { NavHeight: 14, Padding: 4, HeaderHeight: 12 }

type Props = {
  children: React.ReactNode
}

export const SpMenu = ({ children }: Props) => {
  const router = useRouter()

  return (
    <Box h="100vh">
      <Box p={LayoutStyles.Padding} h="calc(100vh - 56px)">
        <Box>{children}</Box>
        {/* childrenの高さが大きいとナビゲーションバーの背後に隠れてしまうため */}
        {/* margin, paddingで調整が難しく(flexとかのせい？) divで調整する */}
        <Box pt="72px" />
      </Box>

      <HStack
        position="fixed"
        bottom={0}
        as="nav"
        w="100%"
        background="green.500"
        height={LayoutStyles.NavHeight}
        justifyContent="space-between"
        px={4}
      >
        {Icons.map(({ label, icon, link }, i) => (
          <Button
            key={i}
            h={LayoutStyles.NavHeight}
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
    </Box>
  )
}
