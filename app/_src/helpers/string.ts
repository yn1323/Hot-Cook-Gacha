export const makeQueryParamsString = (obj: { [key: string]: any }) => {
  const params: string[] = []

  Object.entries(obj).forEach(([key, value]) => {
    if (!value) return
    params.push(`${key}=${value}`)
  })

  return params.join('&')
}
