'use client'

import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { Fragment, useMemo, useState } from 'react'
import { firebaseDateToStr } from '@/helpers/date'
import { GetGachaHistory } from '@/page/(auth)/gacha/api/history/route'

const InitialGachaShowNum = 5

type Props = {
  gachaHistories: GetGachaHistory['response']['gachaHistories']
}

export const GachaHistory = ({ gachaHistories }: Props) => {
  const [showMore, setShowMore] = useState(false)

  const convertDate = (str: string) =>
    firebaseDateToStr(str, 'yyyy/MM/dd HH:mm')

  const histories = useMemo(
    () =>
      gachaHistories.filter((_, i) =>
        showMore ? true : i < InitialGachaShowNum
      ),
    [gachaHistories, showMore]
  )

  if (gachaHistories.length === 0) {
    return <Text>ガチャ履歴はありません。</Text>
  }

  return (
    <VStack divider={<Divider />}>
      {histories.map((history, i) => (
        <Box key={i} w="100%">
          <Link href={`${history.url}&noStore=true`} style={{ width: '100%' }}>
            <HStack w="100%" justifyContent="space-between" gap={12}>
              <Text w="100%" textAlign="right" fontSize="md" my={2}>
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
      {!showMore && gachaHistories.length > InitialGachaShowNum && (
        <Fragment>
          <Text onClick={() => setShowMore(true)} pb={3} as="button" w="100%">
            もっと見る
          </Text>
          <Divider />
        </Fragment>
      )}
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
