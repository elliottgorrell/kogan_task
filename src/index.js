const axios = require('axios');

const endpoint = axios.create({
  baseURL: 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com',
  timeout: 3000,
});

const getDataFromEndpoint = async (route) => {
  const response = await endpoint.get(route);
  return response.data;
};

const getAllData = async () => {
  let response = await getDataFromEndpoint('/api/products/1');
  let data = response.objects;
  while (response.next) {
    response = await getDataFromEndpoint(response.next);
    data = data.concat(response.objects);
  }
  return data;
};


getAllData()
  .then(data => console.log(data))
  .catch(e => console.error('Error:', e));
