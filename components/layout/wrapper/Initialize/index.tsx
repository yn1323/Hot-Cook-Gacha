import { Fragment, ReactNode } from 'react'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { PostUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/src/api/fetch'

async function accountExistCheck() {
  const { user, isUserExistInDb } = await serverFetch<GetSelf>('/auth/self')

  if (isUserExistInDb || !user) {
    return
  }

  await serverFetch<PostUser>(`/users/${user.uid}`, {
    method: 'POST',
    query: {
      uid: user.uid,
      name: user.name,
      picture: user.picture,
    },
  })
}

type Props = {
  children: ReactNode
}

export const Initialize = async ({ children }: Props) => {
  await accountExistCheck()

  return <Fragment>{children}</Fragment>
}
