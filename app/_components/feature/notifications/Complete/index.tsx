'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'
import completeImage from './images/complete.png'

export const Complete = () => {
  return (
    <Animation>
      <CenterBox noBorder>
        <Image src={completeImage} alt="" width={300} />
        <h2>完了しました！</h2>
        <Link href="/dashboard">
          <Button colorScheme="green">TOPに戻る</Button>
        </Link>
      </CenterBox>
    </Animation>
  )
}
