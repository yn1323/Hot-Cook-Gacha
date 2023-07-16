'use client'

import Image from 'next/image'
import { CenterBox } from '@/component/layout/CenterBox'
import shockedImage from './images/shocked.png'

export const PageNotFound = () => {
  return (
    <CenterBox noBorder>
      <Image src={shockedImage} alt="" width={300} />
      <h2>お探しのページが見つかりませんでした。</h2>
    </CenterBox>
  )
}
