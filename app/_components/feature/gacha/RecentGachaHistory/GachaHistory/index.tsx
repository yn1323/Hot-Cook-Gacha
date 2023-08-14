'use client'

import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { firebaseDateToStr } from '@/helpers/date'
import { GetGachaHistory } from '@/page/(auth)/gacha/api/history/route'

type Props = {
  gachaHistories: GetGachaHistory['response']['gachaHistories']
}

export const GachaHistory = ({ gachaHistories }: Props) => {
  const convertDate = (str: string) =>
    firebaseDateToStr(str, 'yyyy/MM/dd HH:mm')

  return (
    <VStack divider={<Divider />}>
      {gachaHistories.map((history, i) => (
        <Box key={i} w="100%">
          <Link href={history.url} style={{ width: '100%' }}>
            <HStack w="100%">
              <Text w="100%" fontSize="md" my={2}>
                {convertDate(history.dateCreated)}
              </Text>
              <Box w="100%">
                1日
                {getParams(history.url).cookPerDay}食 x{' '}
                {getParams(history.url).term}日分
              </Box>
            </HStack>
          </Link>
        </Box>
      ))}
    </VStack>
  )
}

function getParams(urlString: string) {
  const url = new URL(`http://hogehoge` + urlString)

  const term = url.searchParams.get('term') ?? '0'
  const cookPerDay = url.searchParams.get('cookPerDay') ?? '0'

  return {
    term: parseInt(term),
    cookPerDay: parseInt(cookPerDay),
  }
}
