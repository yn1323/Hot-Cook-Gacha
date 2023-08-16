import { makePath } from '@/src/api/fetch'

export const revalidatePathRequest = async (path: string) => {
  const res = await fetch(makePath(`/api/revalidate?path=${path}`), {
    cache: 'no-cache',
  })
  if (!res?.ok) return null
  return res.json()
}
