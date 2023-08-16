'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { Fragment } from 'react'
import { userAtom } from '@/src/store/user'

type Props = {
  uid: string
  children: React.ReactNode
}

export const ClientCheckLogin = ({ uid, children }: Props) => {
  useHydrateAtoms([[userAtom, { uid: uid }]])

  return <Fragment>{children}</Fragment>
}
