const axios = require('axios');

const endpoint = axios.create({
  baseURL: 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products',
  timeout: 3000,
});

const getDataFromEndpoint = async () => {
  const response = await endpoint.get('/1');
  return response.data;
};

getDataFromEndpoint()
  .then(data => console.log(data))
  .catch(e => console.error('Error:', e));
