const fetcher = (url: string) => fetch(url).then(res => res.json())
const fetcherWithUserId = (url: string, userId: string) => fetch(`${url}?userId=${userId}`).then(res => res.json())
export { fetcher, fetcherWithUserId }