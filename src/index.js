const axios = require('axios');

const endpoint = axios.create({
  baseURL: 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com',
  timeout: 3000,
});

const getAllData = async () => {
  let response = await endpoint.get('/api/products/1');
  let data = response.data.objects;
  while (response.data.next) {
    response = await endpoint.get(response.data.next);
    data = data.concat(response.data.objects);
  }
  return data;
};

const getWeightOfProduct = (product, conversionFactor) => {
  const volume = (product.size.length / 100) * (product.size.height / 100) * (product.size.width / 100);

  return volume * conversionFactor;
};

const getAllAirConditionerWeights = async () => {
  const products = await getAllData();
  const aircons = products.filter(product => product.category === 'Air Conditioners');

  return aircons.map(aircon => getWeightOfProduct(aircon, 250));
};

const getAverageAirConditionerWeights = async () => {
  const weights = await getAllAirConditionerWeights();
  const totalWeight = weights.reduce((accumulator, currentValue) => accumulator + currentValue);
  return totalWeight / weights.length;
};

getAverageAirConditionerWeights()
  .then(data => console.log(data))
  .catch(e => console.error('Error:', e));
