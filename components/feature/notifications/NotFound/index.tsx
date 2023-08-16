'use client'

import Image from 'next/image'
import { CenterBox } from '@/components/layout/CenterBox'
import shockedImage from './images/shocked.png'

type Props = {
  label?: string
}

export const NotFound = ({ label = '' }: Props) => {
  return (
    <CenterBox noBorder>
      <Image src={shockedImage} alt="" width={300} />
      <h2>{label || 'お探しのページが見つかりませんでした。'}</h2>
    </CenterBox>
  )
}
