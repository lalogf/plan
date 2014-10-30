var models = require('./models/index'),
    http = require('http'),
    options = {
      host:'api.remix.bestbuy.com',
      path:'/v1/products(sku=1752456)?show=sku,name,longDescription,includedItemList.includedItem,&format=json&apiKey=csejz6bbjr5gbwfh9x5vty5k',
      headers: { 'Content-Type': 'application/json'}
    },
    counter = 0;

  
http.get(
  options,
  function(res) {
    res.on('data', function(results){
      JSON.parse(results).products.forEach(function(p) {
        models.Device.create({
          name: p.name,
          description: p.longDescription
        });
      });
    });
  });