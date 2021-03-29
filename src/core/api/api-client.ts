function client(endpoint: string, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };
  return window
    .fetch(`${process.env.FAUNADB_URL}/${endpoint}`, config)
    .then(async function handleResponse(response) {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
