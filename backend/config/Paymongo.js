const createPayment = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic c2tfdGVzdF9najNTOEFOVzcyUkY2aW1OWVZNQktKcnY6'
    },
    body: JSON.stringify({data: {attributes: {amount: 2000}}})
  };
  
  fetch('https://api.paymongo.com/v1/payments', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

module.exports = createPayment;