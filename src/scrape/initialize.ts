'use server'

export const fetchPage = async ({
  url,
  charSet = 'utf-8',
}: {
  url: string
  charSet?: string
}) => {
  let html: string

  if (charSet === 'utf-8') {
    html = await fetch(url).then(response => response.text())
  } else {
    html = await fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => new TextDecoder(charSet).decode(data))
  }

  return html
}
