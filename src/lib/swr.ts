export const fetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .then((res) => res.data)