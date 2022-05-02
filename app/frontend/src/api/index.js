const url = process.env.REACT_APP_URL_API || 'http://localhost:3001';

export default async function requestApi(endpoint, method, payload) {
  const bodyData = JSON.stringify(payload);
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyData,
  };
  const response = await fetch(url + endpoint, requestOptions);
  const responseData = [response.json(), response.status];
  return responseData;
}
