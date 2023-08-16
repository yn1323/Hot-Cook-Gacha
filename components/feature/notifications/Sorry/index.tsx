'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import { Animation } from '@/components/layout/Animation'
import { CenterBox } from '@/components/layout/CenterBox'
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
        <Button
          colorScheme="green"
          mt={4}
          onClick={() => (window.location.href = '/dashboard')}
        >
          戻る
        </Button>
      </CenterBox>
    </Animation>
  )
}
