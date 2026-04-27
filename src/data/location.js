const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function fetchAddresses() {
  return request('/addresses')
}

export function saveAddress(payload) {
  return request('/addresses', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function detectLocation() {
  return request('/location/detect')
}
