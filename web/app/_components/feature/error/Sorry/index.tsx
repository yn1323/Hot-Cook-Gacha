'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { CenterBox } from '@/component/layout/CenterBox'
import shockedImage from './images/shocked.png'

export const Sorry = () => {
  return (
    <CenterBox noBorder>
      <Image src={shockedImage} alt="" />
      <h2>ページを表示できませんでした。</h2>
      <p style={{ width: 'max-content' }}>
        しばらく経ってから試すか、下のボタンからリトライしてください。
      </p>
      <Link href={window.location.href}>
        <Button colorScheme="green" mt={4}>
          リトライ
        </Button>
      </Link>
    </CenterBox>
  )
}
