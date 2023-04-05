const baseURL = 'http://localhost:4000';

export async function makeApiCall(endpoint, method, body = null) {
  try {
    const response = await fetch(baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making API call:', error);
  }
}

export async function loginUser(username, password) {
  const endpoint = '/login';
  const method = 'POST';
  const body = { username, password };

  return await makeApiCall(endpoint, method, body);
}
