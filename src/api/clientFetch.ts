'use client'

import process from 'process'
import { RevalidateTagType } from '@/src/api/tags'

const makePath = (path: string) => {
  const scheme = process.env.NEXT_PUBLIC_IS_LOCAL ? 'http' : 'https'

  const host = window.location.host

  return `${scheme}://${host}${path[0] === '/' ? '' : '/'}${path}`
}

export type BaseFetch = {
  response: unknown
  requestOptions?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    query?: Record<string, any>
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

  const next = { next: options?.next ?? {} }

  const res = await fetch(targetUrl, {
    method,
    ...body,
    headers: {
      cookie: `token=${cookie}`,
      'Content-Type': 'application/json',
    },
    ...next,
  })
  if (!res.ok) return {}
  const json: T['response'] = await res.json()
  return json
}

export const clientFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions']
): Promise<T['response']> => {
  return await baseFetch(path, options)
}
