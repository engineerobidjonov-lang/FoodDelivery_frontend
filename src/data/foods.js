const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value)
    }
  })

  const query = searchParams.toString()
  const response = await fetch(`${API_BASE_URL}${path}${query ? `?${query}` : ''}`)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function fetchCategories() {
  return request('/categories')
}

export function fetchFoods(filters = {}) {
  return request('/foods', filters)
}
