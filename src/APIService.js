export function fetchAPI(path, options) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.letarotfrancais.com' : process.env.REACT_APP_API_BASE_URL
  const session = JSON.parse(localStorage.getItem('session'))

  // Defaults headers
  options = options || {}
  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  if (!options.headers['Authorization'] && session && session.token) {
    options.headers['Authorization'] = `Bearer ${session.token}`
  }
  if (options.headers['Content-Type'] === 'application/json' && options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
  return fetch(new URL(path, baseURL), options).then(res => res.json())
}