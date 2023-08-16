import process from 'process'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { cookies, headers } from 'next/headers'
import { RevalidateTagType } from '@/src/api/tags'
import { getCookie } from '@/src/client'

export const makePath = (path: string) => {
  const scheme = process.env.NEXT_PUBLIC_IS_LOCAL ? 'http' : 'https'
  const host = headers().get('host')
  return `${scheme}://${host}${path[0] === '/' ? '' : '/'}${path}`
}

export type BaseFetch = {
  response: unknown
  requestOptions?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    query?: Record<string, any>
    cache?: RequestInit['cache']
    next?: {
      tags?: RevalidateTagType[]
      revalidate?: NextFetchRequestConfig['revalidate']
    }
  }
}

const baseFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions'],
  cookie = ''
): Promise<T['response'] | {}> => {
  const method = options?.method ?? 'GET'
  const query = options?.query ?? {}

  const targetUrl =
    method === 'GET' && query && Object.keys(query).length > 0
      ? `${makePath(path)}?${Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')}`
      : makePath(path)

  const body = method === 'GET' ? {} : { body: JSON.stringify(query) }

  const cache = { cache: options?.cache ?? 'force-cache' }

  const next = { next: options?.next ?? {} }

  const res = await fetch(targetUrl, {
    method,
    ...body,
    headers: {
      cookie: `token=${cookie}`,
      'Content-Type': 'application/json',
    },
    ...next,
    ...cache,
  })
  if (!res.ok) return {}
  const json: T['response'] = await res.json()
  return json
}

export const serverFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions']
): Promise<T['response']> => {
  return await baseFetch(path, options, cookies().get('token')?.value ?? '')
}

export const clientFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions']
): Promise<T['response']> => {
  return await baseFetch(path, options, getCookie('token'))
}
