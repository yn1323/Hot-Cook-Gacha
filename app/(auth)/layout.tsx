import { SpMenu } from '@/components/layout/SpMenu'
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

const AuthTemplate = async ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  await accountExistCheck()

  return <SpMenu>{children}</SpMenu>
}

export default AuthTemplate
