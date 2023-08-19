export const makeQueryParamsString = (obj: { [key: string]: any }) => {
  const params: string[] = []

  Object.entries(obj).forEach(([key, value]) => {
    if (!value) return
    params.push(`${key}=${value}`)
  })

  return params.join('&')
}

export const isNumber = (string: string) => {
  const regex = /[^0-9]/

  return !regex.test(string)
}
