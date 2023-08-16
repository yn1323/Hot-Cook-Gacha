'use client'

import { Center, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { Fragment } from 'react'

export const ShowMore = () => {
  return (
    <Fragment>
      <Divider />
      <Link href="/recipes/search">
        <Center py={2}> もっと見る</Center>
      </Link>
      <Divider />
    </Fragment>
  )
}
