'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'
import shockedImage from './images/shocked.png'

export const Sorry = () => {
  return (
    <Animation>
      <CenterBox noBorder>
        <Image src={shockedImage} alt="" width={300} />
        <h2>ページを表示できませんでした。</h2>
        <p style={{ width: 'max-content' }}>
          しばらく経ってから再度試してください。
        </p>
        <Link href={window.location.href}>
          <Button colorScheme="green" mt={4}>
            戻る
          </Button>
        </Link>
      </CenterBox>
    </Animation>
  )
}
