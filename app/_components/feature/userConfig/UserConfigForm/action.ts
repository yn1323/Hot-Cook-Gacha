'use server'

import { revalidatePath } from 'next/cache'
import { SchemaType } from '@/component/feature/userConfig/UserConfigForm'
import { UpdateUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'

export async function userConfigFormAction(
  schema: SchemaType,
  { uid }: { uid: string }
) {
  const result = await serverFetch<UpdateUser>(`/users/${uid}`, {
    query: schema,
    cache: 'no-cache',
    method: 'PUT',
  })

  if (!result.ok) {
    return false
  }
  revalidatePath('/')
  return true
}
