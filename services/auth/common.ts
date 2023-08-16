import { getServerAuth } from '@/src/firebase/server'

export const checkAuthentication = async (token?: string) => {
  const auth = getServerAuth()
  if (!token) return false

  const user = await auth.verifyIdToken(token).catch(e => console.log(e))
  return user ?? false
}
