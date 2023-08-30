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

export async function registerUser(username, email, password) {
  const endpoint = '/registeruser';
  const method = 'POST';
  const body = { username, email, password };

  return await makeApiCall(endpoint, method, body);
}

export async function addNewCard(payload) {
  const endpoint = '/addcard';
  const method = 'POST';
  const body = payload;

  return await makeApiCall(endpoint, method, body);
}

export async function getCardsData() {
  const endpoint = '/getcards';
  const method = 'GET';
  const body = null;
  return await makeApiCall(endpoint, method, body);
}

export async function deleteCard(id) {
  const endpoint = `/deletecard`;
  const method = 'DELETE';
  const body = {id};
  return await makeApiCall(endpoint, method, body);
}

export async function updateCard(payload) {
  const endpoint = `/updatecard`;
  const method = 'PUT';
  const body = payload;
  return await makeApiCall(endpoint, method, body);
}