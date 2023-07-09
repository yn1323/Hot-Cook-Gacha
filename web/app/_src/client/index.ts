export const getCookie = (key: string) => {
  return (
    document.cookie.split('; ').find(v => v.includes(`${key}=`)) ?? ''
  ).replace(`${key}=`, '')
}
