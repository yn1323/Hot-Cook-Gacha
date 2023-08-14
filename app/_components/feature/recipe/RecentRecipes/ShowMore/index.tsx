'use client'

import { Center, Divider, Link } from '@chakra-ui/react'
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
