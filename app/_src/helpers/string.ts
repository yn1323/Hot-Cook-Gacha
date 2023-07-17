export const makeQueryParamsString = (obj: { [key: string]: any }) => {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, value)
  })
  return params.toString()
}
