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

const getAllAirConditioners = async () => {
  const products = await getAllData();
  const airConditioners = products.filter(product => product.category === 'Air Conditioners');
  return airConditioners;
};

const getWeightOfProduct = (product, conversionFactor) => {
  const volume = (product.size.length / 100) * (product.size.height / 100) * (product.size.width / 100);
  return volume * conversionFactor;
};

const getAllAirConditionerWeights = async () => {
  const aircons = await getAllAirConditioners();
  return aircons.map(aircon => getWeightOfProduct(aircon, 250));
};

const getAverageAirConditionerWeights = async () => {
  const weights = await getAllAirConditionerWeights();
  const totalWeight = weights.reduce((accumulator, currentValue) => accumulator + currentValue);
  return totalWeight / weights.length;
}

getAllAirConditioners()
  .then(data => console.log(data))
  .catch(e => console.error('Error:', e));

  getAverageAirConditionerWeights()
  .then(data => console.log(data))
  .catch(e => console.error('Error:', e));
