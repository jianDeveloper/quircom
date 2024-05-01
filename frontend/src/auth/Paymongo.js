export const createPayment = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${import.meta.env.PAYMONGO_KEY}`
    },
    body: JSON.stringify({data: {attributes: {amount: 2000}}})
  };
  
  fetch('https://api.paymongo.com/v1/payments', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

const getPayment = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Basic ${import.meta.env.PAYMONGO_KEY}`
  }
};

fetch('https://api.paymongo.com/v1/links/id', getPayment)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

